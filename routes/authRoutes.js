const express = require('express');
const router = express.Router();

// Importando o controlador de autenticação
const { register, login } = require('../controllers/authController');
// Middleware de autenticação
const { authenticateJWT } = require('../middleware/authMiddleware');

// Rota pública para cadastro de usuário
router.post('/register', authenticateJWT, register);

// Rota pública para login
router.post('/login', login);

module.exports = router;
