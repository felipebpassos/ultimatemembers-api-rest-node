const {
    createLesson: createLessonService,
    updateLesson: updateLessonService,
    deleteLesson: deleteLessonService,
} = require('../services/lessonService');

/**
 * Cria uma nova lição.
 * @param {Object} req Requisição.
 * @param {Object} res Resposta.
 */
const createLesson = async (req, res) => {
    try {
        if (req.user.role !== 'adm') {
            return res.status(403).json({ message: 'Acesso negado. Apenas administradores podem criar lições.' });
        }

        const lesson = await createLessonService(req.body);
        res.status(201).json(lesson);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao criar a lição.' });
    }
};

/**
 * Atualiza uma lição pelo ID.
 * @param {Object} req Requisição.
 * @param {Object} res Resposta.
 */
const updateLesson = async (req, res) => {
    try {
        if (req.user.role !== 'adm') {
            return res.status(403).json({ message: 'Acesso negado. Apenas administradores podem atualizar lições.' });
        }

        const { id } = req.params;
        const updatedLesson = await updateLessonService(id, req.body);

        res.status(200).json(updatedLesson);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao atualizar a lição.' });
    }
};

/**
 * Deleta uma lição pelo ID.
 * @param {Object} req Requisição.
 * @param {Object} res Resposta.
 */
const deleteLesson = async (req, res) => {
    try {
        if (req.user.role !== 'adm') {
            return res.status(403).json({ message: 'Acesso negado. Apenas administradores podem deletar lições.' });
        }

        const { id } = req.params;
        const deleted = await deleteLessonService(id);

        if (!deleted) {
            return res.status(404).json({ message: 'Lição não encontrada.' });
        }

        res.status(200).json({ message: 'Lição deletada com sucesso.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao deletar a lição.' });
    }
};

module.exports = {
    createLesson,
    updateLesson,
    deleteLesson,
};
