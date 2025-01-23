const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false, // Desativa logs do SQL no console
  pool: {
    max: 10,       // Número máximo de conexões no pool
    min: 0,        // Número mínimo de conexões no pool
    acquire: 30000, // Tempo máximo (ms) para obter uma conexão antes de lançar erro
    idle: 10000,   // Tempo (ms) que uma conexão pode ficar ociosa antes de ser liberada
  },
});

module.exports = sequelize;
