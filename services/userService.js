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
  return await User.findOne({ where: { email } });
};

/**
 * Busca um usuário pelo UUID.
 * @param {string} uuid UUID do usuário.
 * @returns {Object|null} Usuário encontrado ou null.
 */
const findUserByUuid = async (uuid) => {
  return await User.findOne({ where: { uuid } });
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
  findUserByUuid,
  updateUserProfile,
  generateToken,
};
