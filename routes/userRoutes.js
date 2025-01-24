const express = require('express');
const router = express.Router();

// Importando o controlador de usuário
const { getProfile, updateProfile } = require('../controllers/userController');

/**
 * @swagger
 * /api/v1.0/user/profile:
 *   get:
 *     summary: Obter perfil do usuário autenticado
 *     description: Retorna as informações do perfil do usuário autenticado. A rota requer um token JWT válido.
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: Perfil do usuário retornado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 uuid:
 *                   type: string
 *                   example: "123e4567-e89b-12d3-a456-426614174000"
 *                 name:
 *                   type: string
 *                   example: "João Silva"
 *                 email:
 *                   type: string
 *                   example: "joao.silva@email.com"
 *                 role:
 *                   type: string
 *                   example: "user"
 *       404:
 *         description: Usuário não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuário não encontrado."
 *       500:
 *         description: Erro ao obter o perfil do usuário.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erro ao obter o perfil do usuário."
 */
router.get('/profile', getProfile);

/**
 * @swagger
 * /api/v1.0/user/profile:
 *   put:
 *     summary: Atualizar perfil do usuário autenticado
 *     description: Atualiza as informações do perfil do usuário autenticado. A rota requer um token JWT válido e os dados a serem atualizados no corpo da requisição.
 *     security:
 *       - jwt: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do usuário.
 *                 example: "João Silva"
 *               email:
 *                 type: string
 *                 description: Endereço de e-mail do usuário.
 *                 example: "joao.silva@email.com"
 *               role:
 *                 type: string
 *                 description: Função do usuário.
 *                 example: "user"
 *     responses:
 *       200:
 *         description: Perfil do usuário atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 uuid:
 *                   type: string
 *                   example: "123e4567-e89b-12d3-a456-426614174000"
 *                 name:
 *                   type: string
 *                   example: "João Silva"
 *                 email:
 *                   type: string
 *                   example: "joao.silva@email.com"
 *                 role:
 *                   type: string
 *                   example: "user"
 *       500:
 *         description: Erro ao atualizar o perfil do usuário.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erro ao atualizar o perfil do usuário."
 */
router.put('/profile', updateProfile);

module.exports = router;
