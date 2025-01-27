const { body, param } = require('express-validator');

// Validações para Title
const title = body('title')
    .isString()
    .withMessage('O título deve ser uma string')
    .isLength({ min: 3 })
    .withMessage('O título deve ter pelo menos 3 caracteres');

// Validações para Description
const description = body('description')
    .optional()
    .isString()
    .withMessage('A descrição deve ser uma string')
    .isLength({ min: 10 })
    .withMessage('A descrição deve ter pelo menos 10 caracteres');

// Validações para Link
const link = body('link')
    .isURL()
    .withMessage('O link deve ser uma URL válida');

// Validações para Image URL
const imageUrl = body('image_url')
    .isURL()
    .withMessage('O URL da imagem deve ser uma URL válida');

// Validações para ID
const id = param('id')
    .isInt()
    .withMessage('O ID deve ser um número inteiro');

// Validação para criação de banner
const createBannerValidation = [
    title,
    description.optional(),
    link,
    imageUrl
];

// Validação para atualizar banner
const updateBannerValidation = [
    id,
    title.optional(),
    description.optional(),
    link.optional(),
    imageUrl.optional()
];

// Validação para deletar banner
const deleteBannerValidation = [
    id
];

module.exports = {
    createBannerValidation,
    updateBannerValidation,
    deleteBannerValidation
};
