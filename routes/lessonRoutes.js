const express = require('express');
const router = express.Router();

// Importando o controlador de lições
const { createLesson, getLessons, updateLesson, deleteLesson } = require('../controllers/lessonController');

// Rota privada - Criar lição
router.post('/', createLesson);

// Rota privada - Obter todas as lições
router.get('/', getLessons);

// Rota privada - Atualizar lição
router.put('/:id', updateLesson);

// Rota privada - Deletar lição
router.delete('/:id', deleteLesson);

module.exports = router;
