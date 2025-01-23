const {
    createModule: createModuleService,
    getModules: getModulesService,
    updateModule: updateModuleService,
    deleteModule: deleteModuleService,
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
  
  module.exports = {
    createModule,
    getModules,
    updateModule,
    deleteModule,
  };
  