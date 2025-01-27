const express = require('express');
const router = express.Router();

// Importando o controlador de lições
const { createLesson, updateLesson, deleteLesson } = require('../controllers/lessonController');
// Importando validações e middleware de validação
const { createLessonValidation, updateLessonValidation, deleteLessonValidation } = require('../validations/moduleLessonValidations');
const validate = require('../middleware/validate');

/**
 * @swagger
 * tags:
 *   name: Lessons
 *   description: Gerenciamento de aulas
 */

/**
 * @swagger
 * /api/v1.0/lessons:
 *   post:
 *     tags:
 *       - Lessons
 *     summary: Criar uma nova aula (somente administradores)
 *     description: Cria uma nova aula. A rota requer um token JWT válido e o role 'adm'.
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
 *                 example: "Introdução ao VFX: Efeitos Visuais para Cinema"
 *               description:
 *                 type: string
 *                 example: "Aprenda a criar efeitos visuais realistas para filmes e séries utilizando ferramentas de ponta como o After Effects."
 *               video:
 *                 type: string
 *                 example: "https://example.com/vfx-intro.mp4"
 *               platform:
 *                 type: string
 *                 enum: ['AWS', 'Vimeo', 'Panda', 'YouTube']
 *                 example: "YouTube"
 *               moduleId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Aula criada com sucesso.
 *       403:
 *         description: Acesso negado para usuários não administradores.
 *       500:
 *         description: Erro ao criar a aula.
 */
router.post('/', validate(createLessonValidation), createLesson);

/**
 * @swagger
 * /api/v1.0/lessons/{id}:
 *   put:
 *     tags:
 *       - Lessons
 *     summary: Atualizar uma aula existente (somente administradores)
 *     description: Atualiza os detalhes de uma aula existente com base no ID. A rota requer um token JWT válido e o role 'adm'.
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da aula a ser atualizada.
 *         schema:
 *           type: integer
 *           example: 3
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Desenvolvimento de Jogos com Unity"
 *               description:
 *                 type: string
 *                 example: "Domine a criação de jogos interativos usando Unity, aprendendo desde o básico até técnicas avançadas."
 *               video:
 *                 type: string
 *                 example: "https://example.com/unity-dev.mp4"
 *               platform:
 *                 type: string
 *                 enum: ['AWS', 'Vimeo', 'Panda', 'YouTube']
 *                 example: "Vimeo"
 *               moduleId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Aula atualizada com sucesso.
 *       403:
 *         description: Acesso negado para usuários não administradores.
 *       500:
 *         description: Erro ao atualizar a aula.
 */
router.put('/:id', validate(updateLessonValidation), updateLesson);

/**
 * @swagger
 * /api/v1.0/lessons/{id}:
 *   delete:
 *     tags:
 *       - Lessons
 *     summary: Deletar uma aula (somente administradores)
 *     description: Deleta uma aula existente com base no ID. A rota requer um token JWT válido e o role 'adm'.
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da aula a ser deletada.
 *         schema:
 *           type: integer
 *           example: 2
 *     responses:
 *       200:
 *         description: Aula deletada com sucesso.
 *       403:
 *         description: Acesso negado para usuários não administradores.
 *       500:
 *         description: Erro ao deletar a aula.
 */
router.delete('/:id', validate(deleteLessonValidation), deleteLesson);

module.exports = router;
