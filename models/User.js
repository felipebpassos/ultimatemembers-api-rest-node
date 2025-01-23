const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt'); // Biblioteca para hashing de senhas
const sequelize = require('../config/db'); // Caminho para a configuração do Sequelize

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
  timestamps: true, // Adiciona createdAt e updatedAt
  hooks: {
    // Antes de criar ou atualizar o usuário, hash a senha
    async beforeCreate(user) {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, 10); // Hash da senha com um salt de 10 rounds
      }
    },
    async beforeUpdate(user) {
      if (user.password && user.changed('password')) {
        user.password = await bcrypt.hash(user.password, 10);
      }
    },
  },
});

// Métodos de instância para comparar senhas
User.prototype.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = User;
