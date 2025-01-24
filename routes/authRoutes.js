const express = require('express');
const router = express.Router();

// Importando o controlador de autenticação
const { register, login } = require('../controllers/authController');
// Middleware de autenticação
const { authenticateJWT } = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/v1.0/auth/register:
 *   post:
 *     summary: Cadastro de novo usuário
 *     description: Apenas administradores podem registrar novos usuários. O registro de usuários exige um token JWT válido de um administrador.
 *     security:
 *       - jwt: []  # Referência ao esquema de segurança
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome completo do usuário.
 *                 example: "João Silva"
 *               email:
 *                 type: string
 *                 description: Endereço de e-mail do usuário.
 *                 example: "joao.silva@email.com"
 *               password:
 *                 type: string
 *                 description: Senha para o novo usuário.
 *                 example: "SenhaSegura123"
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuário registrado com sucesso."
 *                 user:
 *                   type: object
 *                   properties:
 *                     uuid:
 *                       type: string
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     name:
 *                       type: string
 *                       example: "João Silva"
 *                     email:
 *                       type: string
 *                       example: "joao.silva@email.com"
 *                     role:
 *                       type: string
 *                       example: "user"
 *       400:
 *         description: E-mail já está em uso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Email já está em uso."
 *       403:
 *         description: Acesso negado. Apenas administradores podem registrar usuários.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Apenas administradores podem registrar novos usuários."
 *       500:
 *         description: Erro ao registrar usuário.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erro ao registrar usuário."
 */
router.post('/register', authenticateJWT, register);

/**
 * @swagger
 * /api/v1.0/auth/login:
 *   post:
 *     summary: Login de usuário
 *     description: Realiza o login de um usuário existente. Exige email e senha válidos. Retorna um token JWT se o login for bem-sucedido.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: Endereço de e-mail do usuário.
 *                 example: "joao.silva@email.com"
 *               password:
 *                 type: string
 *                 description: Senha do usuário.
 *                 example: "SenhaSegura123"
 *     responses:
 *       200:
 *         description: Login bem-sucedido, token gerado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login bem-sucedido."
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 user:
 *                   type: object
 *                   properties:
 *                     uuid:
 *                       type: string
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     name:
 *                       type: string
 *                       example: "João Silva"
 *                     email:
 *                       type: string
 *                       example: "joao.silva@email.com"
 *                     role:
 *                       type: string
 *                       example: "user"
 *       401:
 *         description: Credenciais inválidas (e-mail ou senha incorretos).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Credenciais inválidas."
 *       500:
 *         description: Erro ao realizar login.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erro ao realizar login."
 */
router.post('/login', login);

module.exports = router;
