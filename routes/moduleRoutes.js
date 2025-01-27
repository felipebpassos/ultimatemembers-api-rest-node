const express = require('express');
const router = express.Router();

// Importando o controlador de módulos
const { createModule, getModules, updateModule, deleteModule, getLessonsByModule } = require('../controllers/moduleController');
// Importando validações e middleware de validação
const { createModuleValidation, updateModuleValidation, deleteModuleValidation, getLessonsByModuleValidation } = require('../validations/moduleLessonValidations');
const validate = require('../middleware/validate');

/**
 * @swagger
 * tags:
 *   name: Modules
 *   description: Gerenciamento de módulos e aulas associadas
 */

/**
 * @swagger
 * /api/v1.0/modules:
 *   post:
 *     tags:
 *       - Modules
 *     summary: Criar um novo módulo (somente administradores)
 *     description: Cria um novo módulo. A rota requer um token JWT válido.
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
 *                 description: Título do módulo.
 *                 example: "Introdução ao Node.js"
 *               description:
 *                 type: string
 *                 description: Descrição do módulo.
 *                 example: "Módulo básico sobre Node.js"
 *               cover_url:
 *                 type: string
 *                 description: URL da capa do módulo.
 *                 example: "https://example.com/capa-modulo.jpg"
 *               video_cover_url:
 *                 type: string
 *                 description: URL do vídeo do módulo.
 *                 example: "https://example.com/video-capa.mp4"
 *     responses:
 *       201:
 *         description: Módulo criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: "Introdução ao Node.js"
 *                 description:
 *                   type: string
 *                   example: "Módulo básico sobre Node.js"
 *                 cover_url:
 *                   type: string
 *                   example: "https://example.com/capa-modulo.jpg"
 *                 video_cover_url:
 *                   type: string
 *                   example: "https://example.com/video-capa.mp4"
 *       400:
 *         description: Dados inválidos.
 *       500:
 *         description: Erro ao criar o módulo.
 */
router.post('/', validate(createModuleValidation), createModule);

/**
 * @swagger
 * /api/v1.0/modules:
 *   get:
 *     tags:
 *       - Modules
 *     summary: Obter todos os módulos
 *     description: Retorna todos os módulos cadastrados. A rota requer um token JWT válido.
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: Lista de módulos retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   cover_url:
 *                     type: string
 *                   video_cover_url:
 *                     type: string
 *       500:
 *         description: Erro ao obter os módulos.
 */
router.get('/', getModules);

/**
 * @swagger
 * /api/v1.0/modules/{id}:
 *   put:
 *     tags:
 *       - Modules
 *     summary: Atualizar um módulo existente (somente administradores)
 *     description: Atualiza um módulo baseado no ID fornecido. Requer token JWT válido.
 *     security:
 *       - jwt: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do módulo a ser atualizado
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título do módulo.
 *                 example: "Node.js Avançado"
 *               description:
 *                 type: string
 *                 description: Descrição do módulo.
 *                 example: "Módulo avançado sobre Node.js"
 *               cover_url:
 *                 type: string
 *                 description: URL da capa do módulo.
 *                 example: "https://example.com/capa-modulo-novo.jpg"
 *               video_cover_url:
 *                 type: string
 *                 description: URL do vídeo do módulo.
 *                 example: "https://example.com/video-capa-novo.mp4"
 *     responses:
 *       200:
 *         description: Módulo atualizado com sucesso.
 *       404:
 *         description: Módulo não encontrado.
 *       500:
 *         description: Erro ao atualizar o módulo.
 */
router.put('/:id', validate(updateModuleValidation), updateModule);

/**
 * @swagger
 * /api/v1.0/modules/{id}:
 *   delete:
 *     tags:
 *       - Modules
 *     summary: Deletar um módulo (somente administradores)
 *     description: Remove um módulo com base no ID fornecido. Requer um token JWT válido.
 *     security:
 *       - jwt: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do módulo a ser deletado.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Módulo deletado com sucesso.
 *       404:
 *         description: Módulo não encontrado.
 *       500:
 *         description: Erro ao deletar o módulo.
 */
router.delete('/:id', validate(deleteModuleValidation), deleteModule);

/**
 * @swagger
 * /api/v1.0/modules/{id}/lessons:
 *   get:
 *     tags:
 *       - Modules
 *     summary: Obter aulas de um módulo específico
 *     description: Retorna uma lista de aulas associadas ao módulo com o ID fornecido.
 *     security:
 *       - jwt: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do módulo.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de aulas retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   video_url:
 *                     type: string
 *       404:
 *         description: Módulo não encontrado.
 *       500:
 *         description: Erro ao obter as aulas do módulo.
 */
router.get('/:id/lessons', validate(getLessonsByModuleValidation), getLessonsByModule);

module.exports = router;
