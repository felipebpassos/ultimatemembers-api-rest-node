const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const { sequelize } = require('./models'); // Importando a configuração do Sequelize

// Importando as rotas
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const bannerRoutes = require('./routes/bannerRoutes');
const moduleRoutes = require('./routes/moduleRoutes');
const lessonRoutes = require('./routes/lessonRoutes');

// Middleware de autenticação
const { authenticateJWT } = require('./middleware/authMiddleware');

// Inicializando o aplicativo Express
const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev')); // Log de requisições
app.use(express.json()); // Permite que o servidor entenda requisições com corpo JSON

// Rotas públicas
app.use('/auth', authRoutes);

// Rotas privadas (protegidas por JWT)
app.use('/users', authenticateJWT, userRoutes);
app.use('/banners', authenticateJWT, bannerRoutes);
app.use('/modules', authenticateJWT, moduleRoutes);
app.use('/lessons', authenticateJWT, lessonRoutes);

// Página inicial
app.get('/', (req, res) => {
  res.send('Bem-vindo à API da Ultimate Members');
});

// Iniciando o servidor e conectando ao banco de dados
const startServer = async () => {
  try {
    // Conectando ao banco de dados MySQL com Sequelize
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados bem-sucedida!');

    // Sincronizando os modelos com o banco de dados
    await sequelize.sync({ force: false });
    console.log('Modelos sincronizados com o banco de dados!');

    // Inicializando o servidor na porta 3000
    app.listen(process.env.PORT || 3000, () => {
      console.log('Servidor rodando na porta 3000');
    });
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
};

startServer();
