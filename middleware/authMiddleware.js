const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Importa o modelo User

// Middleware de autenticação JWT
const authenticateJWT = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Extraindo o token do cabeçalho Authorization

  if (!token) {
    return res.status(403).json({ message: 'Acesso negado. Nenhum token fornecido.' });
  }

  try {
    // Decodifica o token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Verifica se o usuário existe no banco de dados
    const user = await User.findOne({ where: { uuid: decoded.uuid } });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    // Verifica se o role no token corresponde ao role do banco de dados
    if (user.role !== decoded.role) {
      return res.status(403).json({ message: 'Acesso negado. Permissões insuficientes.' });
    }

    // Adiciona os dados do usuário ao objeto req.user
    req.user = {
      uuid: user.uuid,
      role: user.role,
      name: user.name,
      email: user.email,
    };

    next(); // Passa para o próximo middleware ou rota
  } catch (err) {
    console.error(err);
    return res.status(403).json({ message: 'Token inválido.' });
  }
};

module.exports = { authenticateJWT };
