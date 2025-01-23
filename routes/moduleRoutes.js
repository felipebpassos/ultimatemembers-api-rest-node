const express = require('express');
const router = express.Router();

// Importando o controlador de módulos
const { createModule, getModules, updateModule, deleteModule } = require('../controllers/moduleController');

// Rota privada - Criar módulo
router.post('/', createModule);

// Rota privada - Obter todos os módulos
router.get('/', getModules);

// Rota privada - Atualizar módulo
router.put('/:id', updateModule);

// Rota privada - Deletar módulo
router.delete('/:id', deleteModule);

module.exports = router;
