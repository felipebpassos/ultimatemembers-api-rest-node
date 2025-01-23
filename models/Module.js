const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Module = sequelize.define('Module', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  cover_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  video_cover_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true, // createdAt e updatedAt
});

module.exports = Module;
