const {
    createBanner: createBannerService,
    getBanners: getBannersService,
    updateBanner: updateBannerService,
    deleteBanner: deleteBannerService,
} = require('../services/bannerService');

/**
 * Cria um novo banner.
 * @param {Object} req Requisição.
 * @param {Object} res Resposta.
 */
const createBanner = async (req, res) => {
    try {
        if (req.user.role !== 'adm') {
            return res.status(403).json({ message: 'Acesso negado. Apenas administradores podem criar banners.' });
        }

        const banner = await createBannerService(req.body);
        res.status(201).json(banner);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao criar o banner.' });
    }
};

/**
 * Obtém todos os banners.
 * @param {Object} req Requisição.
 * @param {Object} res Resposta.
 */
const getBanners = async (req, res) => {
    try {
        const banners = await getBannersService();
        res.status(200).json(banners);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao obter os banners.' });
    }
};

/**
 * Atualiza um banner pelo ID.
 * @param {Object} req Requisição.
 * @param {Object} res Resposta.
 */
const updateBanner = async (req, res) => {
    try {
        if (req.user.role !== 'adm') {
            return res.status(403).json({ message: 'Acesso negado. Apenas administradores podem atualizar banners.' });
        }

        const { id } = req.params;
        const updatedBanner = await updateBannerService(id, req.body);

        res.status(200).json(updatedBanner);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao atualizar o banner.' });
    }
};

/**
 * Deleta um banner pelo ID.
 * @param {Object} req Requisição.
 * @param {Object} res Resposta.
 */
const deleteBanner = async (req, res) => {
    try {
        if (req.user.role !== 'adm') {
            return res.status(403).json({ message: 'Acesso negado. Apenas administradores podem deletar banners.' });
        }

        const { id } = req.params;
        const deleted = await deleteBannerService(id);

        if (!deleted) {
            return res.status(404).json({ message: 'Banner não encontrado.' });
        }

        res.status(200).json({ message: 'Banner deletado com sucesso.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao deletar o banner.' });
    }
};

module.exports = {
    createBanner,
    getBanners,
    updateBanner,
    deleteBanner,
};
