const jwt = require('jsonwebtoken');
require('dotenv').config({ path: require('path').resolve(__dirname, '../../../.env') });

const JWT_SECRET = process.env.JWT_SECRET;

const protect = async (req, res, next) => {
    let token;
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        try {
            token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = decoded.user; 
            next();
        } catch (error) {
            console.warn(`[Auth Protect] Token inválido/expirado. Erro: ${error.message}, IP: ${req.ip}, Token: ${token}`);
            return res.status(401).json({ message: 'Não autorizado, token falhou.' });
        }
    }

    if (!token) {
        console.warn(`[Auth Protect] Tentativa de acesso sem token. Rota: ${req.originalUrl}, IP: ${req.ip}`);
        return res.status(401).json({ message: 'Não autorizado, sem token.' });
    }
};

const authorize = (...rolesPermitidas) => {
    return (req, res, next) => {
        if (!req.user || !req.user.tipoUsuario || !rolesPermitidas.includes(req.user.tipoUsuario)) {
            console.error(
                `[Auth Authorize] Acesso negado para usuário ID: ${req.user?.idUsuario} (Tipo: ${req.user?.tipoUsuario}). ` +
                `Rota: ${req.originalUrl}. Perfis permitidos: ${rolesPermitidas.join(',')}`
            );
            return res.status(403).json({ message: `Acesso proibido. Requer perfil: ${rolesPermitidas.join(' ou ')}.` });
        }
        next();
    };
};

module.exports = { protect, authorize };