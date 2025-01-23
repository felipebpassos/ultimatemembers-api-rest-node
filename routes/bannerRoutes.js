const express = require('express');
const router = express.Router();

// Importando o controlador de módulos
const { createBanner, getBanners, updateBanner, deleteBanner } = require('../controllers/bannerController');

// Rota privada - Criar módulo
router.post('/', createBanner);

// Rota privada - Obter todos os módulos
router.get('/', getBanners);

// Rota privada - Atualizar módulo
router.put('/:id', updateBanner);

// Rota privada - Deletar módulo
router.delete('/:id', deleteBanner);

module.exports = router;
