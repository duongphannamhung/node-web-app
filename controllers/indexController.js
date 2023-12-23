'use strict';

const controller = {};
const models = require('../models');

controller.showHomepage = async (req, res) => {
    const Brand = models.Brand;
    const brands = await Brand.findAll();
    res.render('index', { brands: brands });
}

controller.showPage = (req, res, next) => {
    const page = ['cart', 'checkout', 'contact', 'login', 'my-account', 'product-detail', 'product-list', 'wishlist']
    if (page.includes(req.params.page)) {
        return res.render(req.params.page);
    }
    next();
}

module.exports = controller;