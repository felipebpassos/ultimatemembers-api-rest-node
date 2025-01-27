const { body, query, param } = require('express-validator');

// Validação para e-mail
const email = body('email')
    .isEmail()
    .withMessage('E-mail inválido');

// Validação para senha
const password = body('password')
    .isString()
    .withMessage('A senha deve ser uma string')
    .isLength({ min: 6 })
    .withMessage('A senha deve ter pelo menos 6 caracteres');

// Validação para nome
const name = body('name')
    .isString()
    .withMessage('O nome deve ser uma string')
    .isLength({ min: 3 })
    .withMessage('O nome deve ter pelo menos 3 caracteres');

// Validação para UUID (body)
const uuidBody = body('uuid')
    .isUUID()
    .withMessage('UUID inválido');
// Validação para UUID (params)
const uuidParams = param('uuid')
    .isUUID()
    .withMessage('UUID inválido');

// Validação para role (body)
const roleBody = body('role')
    .isString()
    .withMessage('O papel do usuário deve ser uma string');
// Validação para role (query)
const roleQuery = query('role')
    .isString()
    .withMessage('O papel do usuário deve ser uma string');

// Validação para page
const page = query('page')
    .isInt({ min: 1 })
    .withMessage('A página deve ser um número inteiro maior ou igual a 1');


// Validação para criação de usuário
const createUserValidation = [
    name,
    email,
    password
];

// Validação para login
const loginValidation = [
    email,
    password
];

// Validação para atualizar perfil
const updateProfileValidation = [
    uuidBody,
    name.optional(),
    email.optional(),
    roleBody.optional(),
];

// Validação para deletar usuário
const deleteUserValidation = [
    uuidParams,
];

// Validação para obter usuários por papel
const getUsersByRoleValidation = [
    page.optional(),
    roleQuery.optional(),
];

module.exports = {
    createUserValidation,
    loginValidation,
    updateProfileValidation,
    deleteUserValidation,
    getUsersByRoleValidation
};
