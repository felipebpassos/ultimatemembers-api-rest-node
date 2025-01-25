const { createUser, findUserByEmail, generateToken } = require('../services/userService');

/**
 * Controlador para registrar um novo usuário.
 * Apenas um administrador (role='adm') pode registrar novos usuários.
 */
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verifica se o usuário autenticado é um administrador
    if (req.user.role !== 'adm') {
      return res.status(403).json({ message: 'Apenas administradores podem registrar novos usuários.' });
    }

    // Verifica se o email já está cadastrado
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email já está em uso.' });
    }

    // Cria o usuário com o role padrão 'user'
    const user = await createUser({ name, email, password });

    res.status(201).json({
      message: 'Usuário registrado com sucesso.',
      user: { uuid: user.uuid, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao registrar usuário.' });
  }
};

/**
 * Controlador para login de usuários.
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Busca o usuário pelo email
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    // Verifica a senha
    const isPasswordValid = await user.checkPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    // Gera o token JWT
    const token = generateToken({ uuid: user.uuid, role: user.role });

    // Remove o campo password antes de enviar a resposta
    const { password: _, ...userWithoutPassword } = user.toJSON();

    res.status(200).json({
      message: 'Login bem-sucedido.',
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao realizar login.' });
  }
};

module.exports = {
  register,
  login,
};
