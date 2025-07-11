const db = require('../config/db'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: require('path').resolve(__dirname, '../../../.env')});

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

const generateToken = (idUsuario, tipoUsuario) => {
    return jwt.sign({ user: { idUsuario, tipoUsuario } }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
    });
};

const registrarUsuario = async (req, res, next) => {
    const { nomeUsuario, email, senha, username, telefone, idEndereco, fotoUsuario, descricaoUsuario } = req.body;

    if (!nomeUsuario || !email || !senha ) {
        return res.status(400).json({
            message: 'Campos obrigatórios: nomeUsuario, email e senha'
        });
    }

    try {
        let queryText = 'SELECT email FROM procuraPet_v3.usuario WHERE email = ?';
        let resultsEmail = await db.query(queryText, [email]); 
        if (resultsEmail.length > 0) {
            console.warn(`[User Register] Tentativa de registro com email já existente: ${email}`);
            return res.status(400).json({ message: 'Este email já está cadastrado.' });
        }

        // queryText = 'SELECT username FROM procuraPet_v3.usuario WHERE username = ?';
        // let resultsUsername = await db.query(queryText, [username]);
        // if (resultsUsername.length > 0) {
        //     console.warn(`[User Register] Tentativa de registro com username já existente: ${username}`);
        //     return res.status(400).json({ message: 'Este username já está em uso.' });
        // }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(senha, salt);
        const statusContaPadrao = 'inativo';
        const tipoUsuarioPadrao = 'padrao'; 

        const insertQuery = `
            INSERT INTO procuraPet_v3.usuario 
                (nomeUsuario, email, senha, username, telefone, idEndereco, statusConta, tipoUsuario, fotoUsuario, descricaoUsuario) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `;

        const resultInsert = await db.query(insertQuery, [
            nomeUsuario, email, hashedPassword, username || "Pet Friend", telefone || "0000000000",
            idEndereco || null, statusContaPadrao, tipoUsuarioPadrao, fotoUsuario || null, descricaoUsuario || null
        ]);

        const idNovoUsuario = resultInsert.insertId;

        if (!idNovoUsuario) {
            console.error('[User Register] Falha ao obter o ID do novo usuário após o INSERT.');
            throw new Error('Não foi possível registrar o usuário.');
        }

        console.log(`[User Register] Novo usuário registrado: ${email} (ID: ${idNovoUsuario})`);

        res.status(201).json({
            // success: true,
            message: 'Usuário registrado com sucesso!',
            data: {
                idUsuario: idNovoUsuario,
                nomeUsuario,
                email,
                username,
                telefone,
                tipoUsuario: tipoUsuarioPadrao,
                statusConta: statusContaPadrao
            },
            token: generateToken(idNovoUsuario, tipoUsuarioPadrao)
        });        

    } catch (error) {
        console.error(`[User Register] Erro ao registrar usuário ${email}: ${error.message}`, { stack: error.stack });
        error.customMessage = 'Erro no servidor ao registrar usuário.';
        next(error);
    }
};

const loginUsuario = async (req, res, next) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ message: 'Por favor, forneça email e senha.' });
    }

    try {
        const queryText = 'SELECT idUsuario, nomeUsuario, email, username, senha, tipoUsuario, statusConta FROM procuraPet_v3.usuario WHERE email = ?';
        const usuarios = await db.query(queryText, [email]); 

        if (usuarios.length === 0) {
            console.warn(`[User Login] Tentativa de login falhou (usuário não encontrado): ${email}, IP: ${req.ip}`);
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }
        const usuario = usuarios[0]; 
        
        if (usuario.statusConta !== 'ativo') {
            console.warn(`[User Login] Tentativa de login para conta não ativa: ${email} (Status: ${usuario.statusConta}), IP: ${req.ip}`);
            let mensagemStatus = 'Esta conta não está ativa.';
            if (usuario.statusConta === 'suspenso') mensagemStatus = 'Esta conta está suspensa.';
            if (usuario.statusConta === 'excluido') mensagemStatus = 'Esta conta foi desativada.';
            return res.status(403).json({ message: mensagemStatus });
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) {
            console.warn(`[User Login] Tentativa de login falhou (senha incorreta): ${email}, IP: ${req.ip}`);
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        console.log(`[User Login] Login bem-sucedido para: ${email} (ID: ${usuario.idUsuario}), IP: ${req.ip}`);

        res.status(200).json({
            idUsuario: usuario.idUsuario,
            nomeUsuario: usuario.nomeUsuario,
            email: usuario.email,
            username: usuario.username,
            tipoUsuario: usuario.tipoUsuario, 
            token: generateToken(usuario.idUsuario, usuario.tipoUsuario),
        });

    } catch (error) {
        console.error(`[User Login] Erro no login para ${email}: ${error.message}`, { stack: error.stack });
        error.customMessage = 'Erro no servidor ao fazer login.';
        next(error);
    }
};

const activateUsuario = async (req, res, next) => {
    const idUsuarioLogado = req.user.idUsuario;

    try {
        const queryText = `
            UPDATE usuario 
            SET statusConta = 'ativo'
            WHERE idUsuario = ?;
        `;
        const usuarios = await db.query(queryText, [idUsuarioLogado]);

        if (usuarios.length === 0) {
            console.warn(`[User Profile] Usuário não encontrado ao buscar perfil. ID: ${idUsuarioLogado}`);
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        res.status(200).json({
            message: 'Conta ativada com sucesso.',
            idUsuario: idUsuarioLogado
        });

    } catch (error) {
        console.error(`[User Profile] Erro ao ativar conta do usuário ID ${idUsuarioLogado}: ${error.message}`, { stack: error.stack });
        error.customMessage = 'Erro no servidor ao ativar conta.';
        next(error);
    }
};

const getMeuPerfil = async (req, res, next) => {
    const idUsuarioLogado = req.user.idUsuario;

    try {
        const queryText = `
            SELECT idUsuario, nomeUsuario, email, username, tipoUsuario, telefone, fotoUsuario, descricaoUsuario, idEndereco, statusConta 
            FROM procuraPet_v3.usuario 
            WHERE idUsuario = ?;
        `;
        const usuarios = await db.query(queryText, [idUsuarioLogado]);

        if (usuarios.length === 0) {
            console.warn(`[User Profile] Usuário não encontrado ao buscar perfil. ID: ${idUsuarioLogado}`);
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        res.status(200).json(usuarios[0]);

    } catch (error) {
        console.error(`[User Profile] Erro ao buscar dados 'meu perfil' do usuário ID ${idUsuarioLogado}: ${error.message}`, { stack: error.stack });
        error.customMessage = 'Erro no servidor ao buscar perfil.';
        next(error);
    }
};

const deleteUsuario = async (req, res, next) => {
  console.log("deleteUsuario chamado");
  console.log("Authorization header:", req.headers.authorization);
  console.log("req.user:", req.user);

  const idUsuarioLogado = req.user?.idUsuario;
  if (!idUsuarioLogado) {
    return res.status(401).json({ message: "Usuário não autenticado." });
  }

  try {
    const queryText = `
      UPDATE procuraPet_v3.usuario 
      SET statusConta = 'excluido' 
      WHERE idUsuario = ?;
    `;

    const result = await db.query(queryText, [idUsuarioLogado]);
    console.log("Resultado do update:", result);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    return res.status(200).json({
      message: 'Conta excluída com sucesso.',
      idUsuario: idUsuarioLogado
    });

  } catch (error) {
    console.error("Erro no deleteUsuario:", error);
    return res.status(500).json({ message: 'Erro interno.' });
  }
};




module.exports = {
    registrarUsuario,
    loginUsuario,
    activateUsuario,
    getMeuPerfil,
    deleteUsuario
};