require('dotenv').config();  // Carrega variáveis do arquivo .env
const { Sequelize } = require('sequelize');  // Importa Sequelize diretamente
const bcrypt = require('bcrypt');  // Biblioteca para hashing de senhas
const { DataTypes } = require('sequelize');  // Para criar os tipos de dados do Sequelize

// Criação da conexão Sequelize diretamente no seed.js
const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false,  // Desabilita logs SQL (opcional)
});

// Definição do modelo User diretamente no seed.js
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    unique: true,
  },
  role: {
    type: DataTypes.ENUM('user', 'adm'),
    defaultValue: 'user',
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, // Valida se o formato é de um email válido
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
  hooks: {
    async beforeCreate(user) {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, 10);  // Hash da senha
      }
    },
    async beforeUpdate(user) {
      if (user.password && user.changed('password')) {
        user.password = await bcrypt.hash(user.password, 10);
      }
    },
  },
});

// Função de seed para criar o usuário Admin
async function seedAdmin() {
  try {
    // Verifica se o usuário 'admin' já existe
    const userExists = await User.findOne({ where: { email: 'admin@simplifyweb.com.br' } });

    if (!userExists) {
      // Cria o usuário 'admin' (a senha será automaticamente hashada no modelo)
      await User.create({
        name: 'Admin',
        email: 'admin@simplifyweb.com.br',
        password: 'admin123',  // A senha será hashada automaticamente pelo hook do modelo
        role: 'adm',
      });

      console.log('Usuário Admin criado com sucesso!');
    } else {
      console.log('O usuário Admin já existe!');
    }
  } catch (error) {
    console.error('Erro ao criar o usuário Admin:', error);
  } finally {
    // Fechar a conexão com o banco de dados
    await sequelize.close();
  }
}

// Executa a função de seed
seedAdmin();
