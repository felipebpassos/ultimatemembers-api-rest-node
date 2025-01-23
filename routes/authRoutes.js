const express = require('express');
const router = express.Router();

// Importando o controlador de autenticação
const { register, login } = require('../controllers/authController');

// Rota pública para cadastro de usuário
router.post('/register', register);

// Rota pública para login
router.post('/login', login);

module.exports = router;
