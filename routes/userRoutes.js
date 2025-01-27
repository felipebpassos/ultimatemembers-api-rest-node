const express = require('express');
const router = express.Router();

// Importando o controlador de usuário
const { getProfile, getUsersByRole, updateProfile, deleteUser } = require('../controllers/userController');
// Importando validações e middleware de validação
const { updateProfileValidation, getUsersByRoleValidation, deleteUserValidation } = require('../validations/userValidations');
const validate = require('../middleware/validate');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gerenciamento de usuários
 */

/**
 * @swagger
 * /api/v1.0/users/profile:
 *   get:
 *     tags:
 *       - Users
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

// Endpoint para listar usuários paginados (somente para 'adm')
/**
 * @swagger
 * /api/v1.0/users/:
 *   get:
 *     tags:
 *       - Users
 *     summary: Obter usuários paginados (somente administradores)
 *     description: Retorna uma lista paginada de usuários. A rota requer um token JWT válido e o role 'adm'.
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: query
 *         name: page
 *         required: true
 *         description: Número da página (começando de 1)
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: role
 *         required: true
 *         description: O role do usuário ('user' ou 'adm')
 *         schema:
 *           type: string
 *           example: "adm"
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       uuid:
 *                         type: string
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       role:
 *                         type: string
 *       403:
 *         description: Acesso negado para usuários não administradores.
 *       500:
 *         description: Erro ao obter usuários.
 */
router.get('/', validate(getUsersByRoleValidation), getUsersByRole);

/**
 * @swagger
 * /api/v1.0/users/profile:
 *   put:
 *     tags:
 *       - Users
 *     summary: Atualizar dados de um usuário (somente administradores)
 *     description: Atualiza as informações do perfil de um usuário específico, com base no UUID fornecido no corpo da requisição. A rota requer um token JWT válido e os dados a serem atualizados no corpo da requisição.
 *     security:
 *       - jwt: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uuid:
 *                 type: string
 *                 description: UUID do usuário a ser atualizado (não do usuário autenticado).
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
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
router.put('/profile', validate(updateProfileValidation), updateProfile);

/**
 * @swagger
 * /api/v1.0/users/{uuid}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Deletar um usuário (somente administradores)
 *     description: Deleta um usuário com base no UUID fornecido. A rota requer um token JWT válido e o role 'adm'.
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         description: UUID do usuário a ser deletado.
 *         schema:
 *           type: string
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso.
 *       403:
 *         description: Acesso negado para usuários não administradores.
 *       404:
 *         description: Usuário não encontrado.
 *       500:
 *         description: Erro ao deletar o usuário.
 */
router.delete('/:uuid', validate(deleteUserValidation), deleteUser);

module.exports = router;
