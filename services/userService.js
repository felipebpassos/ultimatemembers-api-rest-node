const User = require('../models/User');
const jwt = require('jsonwebtoken');

/**
 * Cria um novo usuário.
 * @param {Object} data Dados do novo usuário.
 * @returns {Object} Usuário criado.
 */
const createUser = async (data) => {
  return await User.create(data);
};

/**
 * Busca um usuário pelo email.
 * @param {string} email Email do usuário.
 * @returns {Object|null} Usuário encontrado ou null.
 */
const findUserByEmail = async (email) => {
  return await User.findOne({
    where: { email },
    attributes: { exclude: ['id'] }, // Exclui apenas o id
  });
};

/**
 * Busca um usuário pelo UUID.
 * @param {string} uuid UUID do usuário.
 * @returns {Object|null} Usuário encontrado ou null.
 */
const findUserByUuid = async (uuid) => {
  return await User.findOne({
    where: { uuid },
    attributes: { exclude: ['id', 'password'] } // Exclui id e password da resposta
  });
};

/**
 * Obtém usuários com paginação e filtro por role.
 * @param {number} page Número da página.
 * @param {string} role Role do usuário (ex: 'adm').
 * @returns {Object} Objeto com a lista de usuários e a contagem total.
 */
const getUsersByRoleService = async (page, role) => {
  const limit = 15; // Limite de usuários por página
  const offset = (page - 1) * limit; // Calcula o offset com base na página

  return await User.findAndCountAll({
    where: { role },
    limit,
    offset,
    attributes: { exclude: ['password'] }, // Exclui a senha dos resultados
  });
};

/**
 * Atualiza o perfil de um usuário.
 * @param {string} uuid UUID do usuário.
 * @param {Object} data Dados para atualizar.
 * @returns {Object} Usuário atualizado.
 */
const updateUserProfile = async (uuid, data) => {
  const user = await User.findOne({ where: { uuid } });

  if (!user) {
    throw new Error('Usuário não encontrado.');
  }

  await user.update(data);
  return user;
};

const deleteUserByUuid = async (uuid) => {
  const user = await User.findOne({ where: { uuid } });

  if (!user) {
    return null; // Usuário não encontrado
  }

  await user.destroy(); // Deleta o usuário do banco de dados
  return true; // Retorna verdadeiro se o usuário foi deletado
};

/**
 * Gera um token JWT.
 * @param {Object} payload Dados a serem incluídos no token.
 * @returns {string} Token JWT.
 */
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
};

module.exports = {
  createUser,
  findUserByEmail,
  getUsersByRoleService,
  findUserByUuid,
  updateUserProfile,
  generateToken,
  deleteUserByUuid,
};
