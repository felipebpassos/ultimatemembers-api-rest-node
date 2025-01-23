const jwt = require('jsonwebtoken');

// Middleware de autenticação JWT
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Extraindo o token do cabeçalho Authorization

  if (!token) {
    return res.status(403).json({ message: 'Acesso negado. Nenhum token fornecido.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido.' });
    }

    // Adiciona os dados do usuário ao objeto req.user
    req.user = user; // Agora você pode acessar req.user.uuid e req.user.role em qualquer rota

    next(); // Passa para o próximo middleware ou rota
  });
};

module.exports = { authenticateJWT };
