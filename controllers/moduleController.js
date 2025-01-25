const {
  createModule: createModuleService,
  getModules: getModulesService,
  updateModule: updateModuleService,
  deleteModule: deleteModuleService,
  getLessonsByModule: getLessonsByModuleService,
} = require('../services/moduleService');

// Criar um módulo (apenas adm)
const createModule = async (req, res) => {
  try {
    if (req.user.role !== 'adm') {
      return res.status(403).json({ message: 'Acesso negado. Apenas administradores podem criar módulos.' });
    }

    const moduleData = req.body;
    const module = await createModuleService(moduleData);

    res.status(201).json(module);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao criar o módulo.' });
  }
};

// Obter todos os módulos (acesso geral)
const getModules = async (req, res) => {
  try {
    const modules = await getModulesService();
    res.status(200).json(modules);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao obter os módulos.' });
  }
};

// Atualizar um módulo (apenas adm)
const updateModule = async (req, res) => {
  try {
    if (req.user.role !== 'adm') {
      return res.status(403).json({ message: 'Acesso negado. Apenas administradores podem atualizar módulos.' });
    }

    const { id } = req.params;
    const moduleData = req.body;

    const updatedModule = await updateModuleService(id, moduleData);

    res.status(200).json(updatedModule);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao atualizar o módulo.' });
  }
};

// Deletar um módulo (apenas adm)
const deleteModule = async (req, res) => {
  try {
    if (req.user.role !== 'adm') {
      return res.status(403).json({ message: 'Acesso negado. Apenas administradores podem deletar módulos.' });
    }

    const { id } = req.params;

    await deleteModuleService(id);

    res.status(200).json({ message: 'Módulo deletado com sucesso.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao deletar o módulo.' });
  }
};

// Função para obter as aulas de um módulo específico
const getLessonsByModule = async (req, res) => {
  try {
    const { id } = req.params;

    const lessons = await getLessonsByModuleService(id);

    if (!lessons.length) {
      return res.status(404).json({ message: 'Nenhuma aula encontrada para este módulo.' });
    }

    res.status(200).json(lessons);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao obter as aulas do módulo.' });
  }
};

module.exports = {
  createModule,
  getModules,
  updateModule,
  deleteModule,
  getLessonsByModule,
};
