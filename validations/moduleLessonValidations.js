const { body, param } = require('express-validator');

// Validações para Title
const title = body('title')
    .isString()
    .withMessage('O título deve ser uma string')
    .isLength({ min: 3 })
    .withMessage('O título deve ter pelo menos 3 caracteres');

const description = body('description')
    .isString()
    .withMessage('A descrição deve ser uma string')
    .isLength({ min: 10 })
    .withMessage('A descrição deve ter pelo menos 10 caracteres');

const coverUrl = body('cover_url')
    .isURL()
    .withMessage('A URL da capa deve ser válida');

const videoCoverUrl = body('video_cover_url')
    .isURL()
    .withMessage('A URL do vídeo da capa deve ser válida');

const id = param('id')
    .isInt()
    .withMessage('O ID deve ser um número inteiro');

const video = body('video')
    .isURL()
    .withMessage('O URL do vídeo deve ser válido');

const platform = body('platform')
    .isString()
    .withMessage('A plataforma deve ser uma string')
    .isIn(['AWS', 'Vimeo', 'Panda', 'YouTube'])
    .withMessage('A plataforma deve ser AWS, Vimeo, Panda ou YouTube');

const moduleId = body('moduleId')
    .isInt()
    .withMessage('O ID do módulo deve ser um número inteiro');

// Validação para criação de módulo
const createModuleValidation = [
    title,
    description,
    coverUrl.optional(),
    videoCoverUrl.optional(),
];

// Validação para atualizar módulo
const updateModuleValidation = [
    id,
    title.optional(),
    description.optional(),
    coverUrl.optional(),
    videoCoverUrl.optional(),
];

// Validação para deletar módulo
const deleteModuleValidation = [
    id,
];

// Validação para obter aulas de um módulo específico
const getLessonsByModuleValidation = [
    id,
];

// Validação para criação de aula
const createLessonValidation = [
    title,
    description,
    video,
    platform,
    moduleId,
];

// Validação para atualização de aula
const updateLessonValidation = [
    id,
    title.optional(),
    description.optional(),
    video.optional(),
    platform.optional(),
    moduleId.optional(),
];

// Validação para exclusão de aula
const deleteLessonValidation = [
    id,
];

module.exports = {
    createModuleValidation,
    updateModuleValidation,
    deleteModuleValidation,
    getLessonsByModuleValidation,
    createLessonValidation,
    updateLessonValidation,
    deleteLessonValidation,
};
