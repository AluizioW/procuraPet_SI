const db = require('../config/db'); 
const { montarUpdate } = require('../utils/montarUpdate');

const getPostagem = async (req, res, next) => {
        //const conn = await db.getConnection();
        const {id} = req.params;

        try {
            
            const [result] = await db.query(`
                SELECT p.idPostagem, p.idUsuarioPostagem, u.nomeUsuario, u.email, u.username, u.telefone, u.fotoUsuario,
                    p.descricaoPostagem, p.dataCriacao, p.statusPetPostagem, p.recompensa,  p.dataModificacao,  p.statusPostagem,
                    e.idEndereco, e.logradouro, e.bairro, e.cidade, e.cep,
                    p.idPetPostagem, pet.nome, pet.raca, pet.cor, pet.fotoPet, pet.especie, pet.sexo, pet.idade
                FROM postagem p
                JOIN usuario u ON p.idUsuarioPostagem = u.idUsuario
                JOIN endereco e ON p.idLocal = e.idEndereco
                JOIN pet ON p.idPetPostagem = pet.idPet 
                WHERE p.idPostagem = ? AND NOT p.statusPostagem = ?;`
            , [id, 'excluido']);

            console.log("Resultado:", result)
            if (result.length === 0) {
                console.warn(`[Post] Postagem não encontrada. ID: ${id}`);
                return res.status(404).json({ error: 'Postagem não encontrada' });
            }
        res.status(200).json(result);

    } catch (err) {
        console.error(`[Post] Erro ao buscar postagem. ID: ${id}`);
        res.status(500).json({ error: 'Erro ao buscar postagem' });
    }
}

const criarPostagem = async (req, res, next) => {
    const conn = await db.pool.getConnection();
    const {descricaoPostagem, statusPetPostagem, recompensa, nome, fotoPet, raca, cor, especie, sexo, idade} = req.body;

    try {
        await conn.beginTransaction();

        //const idUsuarioLogado = req.user.idUsuario;

        const idUsuarioLogado = '11'; //Deve ser substituído pelo id do usuário logado, que deve ser obtido do token JWT ou sessão.
        const dataCriacao = new Date().toISOString().slice(0, 19).replace('T', ' ');;
        
        //Pega o idLocal
        const query_endereco = `SELECT e.idEndereco FROM endereco e JOIN usuario u ON u.idEndereco = e.idEndereco WHERE u.idUsuario = ?;`;
        const [result_endereco] = await conn.query(query_endereco, idUsuarioLogado);
        const idLocal = result_endereco[0].idEndereco;
        
        //Inserção na tabela PET
        const query_pet = `INSERT INTO pet (nome, raca, cor, fotoPet, especie, sexo, idDono, idade) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;
        const valores_pet = [nome || null, raca || null, cor, fotoPet, especie, sexo, idUsuarioLogado, idade || null];
        const [result_pet] = await conn.query(query_pet, valores_pet);
        const idPetPostagem = result_pet.insertId;
        
        //Inserção na tabela POSTAGEM
        const query_post = `INSERT INTO postagem (idUsuarioPostagem, descricaoPostagem, dataCriacao, idLocal, idPetPostagem, dataModificacao, dataExclusao, statusPetPostagem, statusPostagem, recompensa) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
        const valores_post = [idUsuarioLogado, descricaoPostagem || null, dataCriacao, idLocal, idPetPostagem, dataCriacao, null, statusPetPostagem, 'ativo', recompensa || null];
        const [result_post] = await conn.query(query_post, valores_post);
        const idPost = result_post.insertId;
        
        await conn.commit();
        console.log('Inserções feitas com sucesso!');
        res.status(201).json({insertId: idPost});
        
    } catch (err) {
        await conn.rollback();
        console.error('Erro nas inserções, tudo desfeito:', err);
        res.status(500).json({ error: 'Erro ao criar postagem' });
    }
}

const editarPostagem = async (req, res, next) => {
    const conn = await db.pool.getConnection();
    const {id} = req.params;
    const {idPostagem, idPetPostagem} = req.body;
    
    const campos_pet = ['nome', 'raca', 'cor', 'fotoPet', 'especie', 'sexo', 'idade'];
    const campos_post = ['descricaoPostagem', 'dataModificacao', 'dataExclusao', 'statusPetPostagem', 
        'statusPostagem', 'recompensa'];

    try{
        //Tabela pet
        const query_pet = `SELECT * FROM pet WHERE idPet= ?;`;
        const [dados_pet] = await conn.query(query_pet, idPetPostagem);
        const dadosAtuaisPet = dados_pet[0];
        const update_pet = montarUpdate(req.body, dadosAtuaisPet, campos_pet, 'pet', 'idPet', idPetPostagem);
        let result_pet = dadosAtuaisPet;

        //Tabela post
        const query_post = `SELECT * FROM postagem WHERE idPostagem= ?;`;
        const [dados_post] = await conn.query(query_post, idPostagem);
        const dadosAtuaisPost = dados_post[0];

        if (dadosAtuaisPost.statusPostagem == 'excluido'){
            console.warn(`[Post] Postagem não encontrada. ID: ${id}`);
            return res.status(404).json({ message: 'Postagem não encontrada.' });
        }

        const update_post = montarUpdate(req.body, dadosAtuaisPost, campos_post, 'postagem', 'idPostagem', idPostagem);
        let result_post = dadosAtuaisPost;

        await conn.beginTransaction();
            if (update_pet){
                await conn.query(update_pet.sql, update_pet.valores);
                result_pet = update_pet.return_atualizacoes;
            } 
            if (update_post){
                await conn.query(update_post.sql, update_post.valores);
                result_post = update_post.return_atualizacoes;
            }

            if (update_pet || update_post){
                console.log('Alterações realizadas com sucesso!');
            }
            else{
                console.log('Nenhuma alteração requisitada.');
            }
            res.status(200).json(result_post , result_pet);
        await conn.commit();
    } catch (err) {
        await conn.rollback();
        console.error('Erro nas alterações, tudo desfeito:', err);
        res.status(500).json({ error: 'Erro ao editar postagem' });
    }
}

const excluirPostagemLogico = async (req, res, next) => {
    const conn = await db.pool.getConnection();
    const {id} = req.params;

    const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

    //Tabela post
    const query_post = `UPDATE postagem SET statusPostagem = ?, dataModificacao = ?, dataExclusao = ? WHERE idPostagem = ?`;
    const valores_post = ['excluido', date , date, id];
    try{
        await conn.beginTransaction();
            const [result_post] = await conn.query(query_post, valores_post);
            res.status(200).json(result_post , result_post);
        await conn.commit();
        console.log('Exclusão lógica realizada com sucesso!');
        res.status(200).json();
        
    } catch (err) {
        await conn.rollback();
        console.error('Erro nas exclusão, tudo desfeito:', err);
        res.status(500).json({ error: 'Erro ao realizar exclusão' });
    }
}
    
module.exports = {
    getPostagem,
    criarPostagem,
    editarPostagem,
    excluirPostagemLogico
};