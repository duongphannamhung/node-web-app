let controller = {};

const models = require('../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;

controller.show = async (req, res) => {
    let category = isNaN(req.query.category) ? 0 : parseInt(req.query.category);
    let brand = isNaN(req.query.brand) ? 0 : parseInt(req.query.brand);
    let tag = isNaN(req.query.tag) ? 0 : parseInt(req.query.tag);
    let keyword = req.query.keyword || '';

    let categories = await models.Category.findAll({
        include: [{ model: models.Product }]
    });
    res.locals.categories = categories;

    let brands = await models.Brand.findAll({
        include: [{ model: models.Product }]
    });
    res.locals.brands = brands;

    let tags = await models.Tag.findAll({
        include: [{ model: models.Product }]
    });
    res.locals.tags = tags;

    let options = {
        attributes: ['id', 'name', 'imagePath', 'stars', 'price', 'oldPrice'],
        where: {}
    };
    if (category > 0) {
        options.where.categoryId = category;
    }
    if (brand > 0) {
        options.where.brandId = brand;
    }
    if (tag > 0) {
        options.include = [{
            model: models.Tag,
            where: { id: tag },
        }]
    }

    if (keyword.trim() != '') {
        options.where.name = {
            [Op.iLike]: `%${keyword}%`
        }
    }

    let products = await models.Product.findAll(options);
    res.locals.products = products;
    res.render('product-list');
}

module.exports = controller;