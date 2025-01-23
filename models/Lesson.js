const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Module = require('./Module');

const Lesson = sequelize.define('Lesson', {
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
  video: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  platform: {
    type: DataTypes.ENUM('AWS', 'Vimeo', 'Panda', 'YouTube'),
    allowNull: false,
  },
  moduleId: {
    type: DataTypes.INTEGER,
    references: {
      model: Module,
      key: 'id',
    },
    onDelete: 'CASCADE',
    allowNull: false,
  },
}, {
  timestamps: true,
});

Lesson.belongsTo(Module, { foreignKey: 'moduleId', onDelete: 'CASCADE' });

module.exports = Lesson;
