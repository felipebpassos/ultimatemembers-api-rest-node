const { findUserByUuid, updateUserProfile } = require('../services/userService');

/**
 * Obtém o perfil do usuário autenticado.
 * @param {Object} req Requisição.
 * @param {Object} res Resposta.
 */
const getProfile = async (req, res) => {
  try {
    const { uuid } = req.user;

    const user = await findUserByUuid(uuid);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.status(200).json({
      uuid: user.uuid,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao obter o perfil do usuário.' });
  }
};

/**
 * Atualiza o perfil do usuário autenticado.
 * @param {Object} req Requisição.
 * @param {Object} res Resposta.
 */
const updateProfile = async (req, res) => {
  try {
    const { uuid } = req.user;
    const updateData = req.body;

    const updatedUser = await updateUserProfile(uuid, updateData);

    res.status(200).json({
      uuid: updatedUser.uuid,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao atualizar o perfil do usuário.' });
  }
};

module.exports = {
  getProfile,
  updateProfile,
};
