const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./config/swagger');
require('dotenv').config();

// Importando o helmet
const helmet = require('helmet');

// Importando a instância do Sequelize
const sequelize = require('./config/db');

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
app.use(helmet()); // Adicionando o helmet para segurança
app.use(morgan('dev')); // Log de requisições
app.use(express.json({ limit: '100kb' })); // Limita o tamanho das requisições JSON para 100 KB

// Middleware de tratamento de erros para payloads muito grandes
app.use((err, req, res, next) => {
  if (err.type === 'entity.too.large') {
    return res.status(413).json({ error: 'Payload muito grande.' });
  }
  next(err);
});

// Prefixo de versão para as rotas
const API_VERSION = '/api/v1.0';

// Configuração do Swagger
app.use(`${API_VERSION}/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rotas públicas
app.use(`${API_VERSION}/auth`, authRoutes);

// Rotas privadas (protegidas por JWT)
app.use(`${API_VERSION}/users`, authenticateJWT, userRoutes);
app.use(`${API_VERSION}/banners`, authenticateJWT, bannerRoutes);
app.use(`${API_VERSION}/modules`, authenticateJWT, moduleRoutes);
app.use(`${API_VERSION}/lessons`, authenticateJWT, lessonRoutes);

// Página inicial
app.get('/', (req, res) => {
  res.send('Bem-vindo à API da Ultimate Members');
});

// Iniciando o servidor e conectando ao banco de dados
const startServer = async () => {
  try {
    // Autenticando e sincronizando o banco de dados
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados bem-sucedida!');
    await sequelize.sync({ alter: true }); // Atualiza o banco sem apagar dados
    console.log('Modelos sincronizados com o banco de dados!');

    // Iniciando o servidor
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
      console.log(`Documentação Swagger disponível em https://ultimatemembers-api-rest-node.onrender.com/api/v1.0/api-docs`);
    });
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
};

startServer();
