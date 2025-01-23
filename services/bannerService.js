const Banner = require('../models/Banner');

/**
 * Cria um novo banner.
 * @param {Object} data Dados do banner.
 * @returns {Object} Banner criado.
 */
const createBanner = async (data) => {
    return await Banner.create(data);
};

/**
 * Obtém todos os banners.
 * @returns {Array} Lista de banners.
 */
const getBanners = async () => {
    return await Banner.findAll();
};

/**
 * Atualiza um banner pelo ID.
 * @param {number} id ID do banner.
 * @param {Object} data Dados para atualizar.
 * @returns {Object} Banner atualizado.
 */
const updateBanner = async (id, data) => {
    const banner = await Banner.findByPk(id);

    if (!banner) {
        throw new Error('Banner não encontrado.');
    }

    await banner.update(data);
    return banner;
};

/**
 * Deleta um banner pelo ID.
 * @param {number} id ID do banner.
 * @returns {boolean} Retorna true se o banner foi deletado.
 */
const deleteBanner = async (id) => {
    const deletedCount = await Banner.destroy({ where: { id } });

    return deletedCount > 0;
};

module.exports = {
    createBanner,
    getBanners,
    updateBanner,
    deleteBanner,
};
