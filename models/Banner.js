const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Banner = sequelize.define('Banner', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  link: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isUrl: {
        msg: 'O link precisa ser uma URL válida.',
      },
    },
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isUrl: {
        msg: 'A URL da imagem precisa ser válida.',
      },
    },
  },
}, {
  timestamps: true, // createdAt e updatedAt
});

module.exports = Banner;
