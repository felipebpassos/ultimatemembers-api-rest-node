const Lesson = require('../models/Lesson');
const Module = require('../models/Module');

/**
 * Cria uma nova lição.
 * @param {Object} data Dados da lição.
 * @returns {Object} Lição criada.
 */
const createLesson = async (data) => {
  return await Lesson.create(data);
};

/**
 * Atualiza uma lição pelo ID.
 * @param {number} id ID da lição.
 * @param {Object} data Dados para atualizar.
 * @returns {Object} Lição atualizada.
 */
const updateLesson = async (id, data) => {
  const lesson = await Lesson.findByPk(id);

  if (!lesson) {
    throw new Error('Lição não encontrada.');
  }

  await lesson.update(data);
  return lesson;
};

/**
 * Deleta uma lição pelo ID.
 * @param {number} id ID da lição.
 * @returns {boolean} Retorna true se a lição foi deletada.
 */
const deleteLesson = async (id) => {
  const deletedCount = await Lesson.destroy({ where: { id } });

  return deletedCount > 0;
};

module.exports = {
  createLesson,
  updateLesson,
  deleteLesson,
};
