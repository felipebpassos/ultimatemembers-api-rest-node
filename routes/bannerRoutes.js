const express = require('express');
const router = express.Router();

// Importando o controlador de banners
const { createBanner, getBanners, updateBanner, deleteBanner } = require('../controllers/bannerController');
// Importando validações e middleware de validação
const { createBannerValidation, updateBannerValidation, deleteBannerValidation } = require('../validations/bannerValidations');
const validate = require('../middleware/validate');

/**
 * @swagger
 * tags:
 *   name: Banners
 *   description: Gerenciamento de banners
 */

/**
 * @swagger
 * /api/v1.0/banners:
 *   post:
 *     tags:
 *       - Banners
 *     summary: Criar um novo banner (Somente administradores)
 *     description: Cria um novo banner. A rota requer um token JWT válido e o role 'adm'.
 *     security:
 *       - jwt: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Banner de Promoção"
 *               link:
 *                 type: string
 *                 example: "https://example.com"
 *               image_url:
 *                 type: string
 *                 example: "https://example.com/banner.jpg"
 *     responses:
 *       201:
 *         description: Banner criado com sucesso.
 *       403:
 *         description: Acesso negado para usuários não administradores.
 *       500:
 *         description: Erro ao criar o banner.
 */
router.post('/', validate(createBannerValidation), createBanner);

/**
 * @swagger
 * /api/v1.0/banners:
 *   get:
 *     tags:
 *       - Banners
 *     summary: Obter todos os banners
 *     description: Retorna uma lista de todos os banners disponíveis. Requer um token JWT válido.
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: Lista de banners.
 *       500:
 *         description: Erro ao obter os banners.
 */
router.get('/', getBanners);

/**
 * @swagger
 * /api/v1.0/banners/{id}:
 *   put:
 *     tags:
 *       - Banners
 *     summary: Atualizar um banner existente (Somente administradores)
 *     description: Atualiza os detalhes de um banner existente com base no ID. A rota requer um token JWT válido e o role 'adm'.
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do banner a ser atualizado.
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Banner de Desconto"
 *               link:
 *                 type: string
 *                 example: "https://example.com/discount"
 *               image_url:
 *                 type: string
 *                 example: "https://example.com/discount-banner.jpg"
 *     responses:
 *       200:
 *         description: Banner atualizado com sucesso.
 *       403:
 *         description: Acesso negado para usuários não administradores.
 *       500:
 *         description: Erro ao atualizar o banner.
 */
router.put('/:id', validate(updateBannerValidation), updateBanner);

/**
 * @swagger
 * /api/v1.0/banners/{id}:
 *   delete:
 *     tags:
 *       - Banners
 *     summary: Deletar um banner (Somente administradores)
 *     description: Deleta um banner existente com base no ID. A rota requer um token JWT válido e o role 'adm'.
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do banner a ser deletado.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Banner deletado com sucesso.
 *       403:
 *         description: Acesso negado para usuários não administradores.
 *       500:
 *         description: Erro ao deletar o banner.
 */
router.delete('/:id', validate(deleteBannerValidation), deleteBanner);

module.exports = router;
