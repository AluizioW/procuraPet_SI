const db = require('../config/db'); 

const getEveryPostagem = async (req, res, next) => {
    try {
        const result = await db.query(`
            SELECT p.idPostagem, p.idUsuarioPostagem, u.username, u.fotoUsuario, p.descricaoPostagem, 
                p.dataCriacao, p.statusPetPostagem, p.statusPostagem, e.idEndereco, p.idPetPostagem, 
                pet.fotoPet FROM postagem p JOIN usuario u ON p.idUsuarioPostagem = u.idUsuario 
                JOIN endereco e ON p.idLocal = e.idEndereco JOIN pet ON p.idPetPostagem = pet.idPet;`
        );

        console.log("Resultado:", result);
        if (result.length === 0) {
            console.warn(`[Post] Postagens não encontradas.`);
            return res.status(404).json({ error: 'Postagem não encontrada' });
        }
        res.status(200).json(result);

    } catch (err) {
        console.error(`[Post] Erro ao buscar postagem:`, err);
        res.status(500).json({ error: 'Erro ao buscar postagem' });
    } finally {
        // if (conn) conn.release();
    }
}

module.exports = {
    getEveryPostagem
};
