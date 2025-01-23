const express = require('express');
const router = express.Router();

// Importando o controlador de usuário
const { getProfile, updateProfile } = require('../controllers/userController');

// Rota privada - Obter perfil do usuário
router.get('/profile', getProfile);

// Rota privada - Atualizar perfil do usuário
router.put('/profile', updateProfile);

module.exports = router;
