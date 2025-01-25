const Module = require('../models/Module');
const Lesson = require('../models/Lesson');

// Service para criar um módulo
const createModule = async (moduleData) => {
  const module = await Module.create(moduleData);
  return module;
};

// Service para obter todos os módulos
const getModules = async () => {
  const modules = await Module.findAll();
  return modules;
};

// Service para atualizar um módulo
const updateModule = async (id, moduleData) => {
  const module = await Module.findByPk(id);

  if (!module) {
    throw new Error('Módulo não encontrado');
  }

  await module.update(moduleData);
  return module;
};

// Service para deletar um módulo
const deleteModule = async (id) => {
  const module = await Module.findByPk(id);

  if (!module) {
    throw new Error('Módulo não encontrado');
  }

  await module.destroy();
  return module;
};

// Service para obter as aulas de um módulo específico
const getLessonsByModule = async (moduleId) => {
  const lessons = await Lesson.findAll({
    where: { moduleId },
    attributes: ['id', 'title', 'description', 'video', 'platform'],
  });
  return lessons;
};

module.exports = {
  createModule,
  getModules,
  updateModule,
  deleteModule,
  getLessonsByModule,
};
