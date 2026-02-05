const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/usuarios');
const authMiddleware = require('../middleware/auth');

// Rutas públicas
router.post('/register', register);
router.post('/login', login);

// Rutas protegidas (requieren autenticación)
router.get('/profile', authMiddleware, getProfile);

module.exports = router;
