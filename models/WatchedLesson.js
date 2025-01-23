const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Lesson = require('./Lesson');

const WatchedLesson = sequelize.define('WatchedLesson', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    onDelete: 'CASCADE',
    allowNull: false,
  },
  lessonId: {
    type: DataTypes.INTEGER,
    references: {
      model: Lesson,
      key: 'id',
    },
    onDelete: 'CASCADE',
    allowNull: false,
  },
  watchedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,
});

WatchedLesson.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
WatchedLesson.belongsTo(Lesson, { foreignKey: 'lessonId', onDelete: 'CASCADE' });

module.exports = WatchedLesson;
