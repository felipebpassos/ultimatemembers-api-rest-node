const { findUserByUuid, getUsersByRoleService, updateUserProfile, deleteUserByUuid } = require('../services/userService');

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
 * Retorna uma lista de usuários paginados.
 * @param {Object} req Requisição.
 * @param {Object} res Resposta.
 */
const getUsersByRole = async (req, res) => {
  try {
    const { page, role } = req.query;

    // Verifica se o usuário tem permissão de administrador
    if (req.user.role !== 'adm') {
      return res.status(403).json({ message: 'Acesso negado.' });
    }

    const pageNumber = parseInt(page, 10) || 1; // Página padrão é 1
    const users = await getUsersByRoleService(pageNumber, role);

    res.status(200).json({
      users: users.rows,
      totalPages: Math.ceil(users.count / 15),
      currentPage: pageNumber,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao obter usuários.' });
  }
};

/**
 * Atualiza o perfil de um usuário específico.
 * @param {Object} req Requisição.
 * @param {Object} res Resposta.
 */
const updateProfile = async (req, res) => {
  try {
    const { uuid, name, email, role } = req.body;

    // Verifica se o usuário autenticado é um administrador
    if (req.user.role !== 'adm') {
      return res.status(403).json({ message: 'Apenas administradores podem atualizar dados dos usuários.' });
    }

    // Valida se o UUID foi passado no corpo da requisição
    if (!uuid) {
      return res.status(400).json({ message: 'UUID do usuário é obrigatório.' });
    }

    // Atualiza os dados do usuário
    const updateData = { name, email, role };
    const updatedUser = await updateUserProfile(uuid, updateData);

    // Retorna os dados atualizados
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

/**
 * Controlador para deletar o usuário.
 * @param {Object} req Requisição.
 * @param {Object} res Resposta.
 */
const deleteUser = async (req, res) => {
  try {
    const { uuid } = req.params;

    // Verifica se o usuário autenticado é um administrador
    if (req.user.role !== 'adm') {
      return res.status(403).json({ message: 'Apenas administradores podem deletar usuários.' });
    }

    // Deleta o usuário do banco de dados (a lógica de exclusão pode ser adaptada conforme sua implementação)
    const deletedUser = await deleteUserByUuid(uuid);

    if (!deletedUser) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.status(200).json({ message: 'Usuário deletado com sucesso.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao deletar o usuário.' });
  }
};

module.exports = {
  getProfile,
  getUsersByRole,
  updateProfile,
  deleteUser,
};
