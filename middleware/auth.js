const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'tu_clave_secreta_super_segura_cambiar_en_produccion';

const authMiddleware = async (req, res, next) => {
    try {
        // Obtener el token del header Authorization
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No se proporcionó token de autenticación'
            });
        }

        // Verificar el token (puede venir como "Bearer TOKEN" o solo "TOKEN")
        const tokenValue = token.startsWith('Bearer ') ? token.slice(7) : token;

        const decoded = jwt.verify(tokenValue, JWT_SECRET);

        // Agregar la información del usuario al request
        req.userId = decoded.userId;
        req.userEmail = decoded.email;

        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Token inválido'
            });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token expirado'
            });
        }
        return res.status(500).json({
            success: false,
            message: 'Error al verificar token'
        });
    }
};

module.exports = authMiddleware;
