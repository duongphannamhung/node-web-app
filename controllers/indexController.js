'use strict';

const controller = {};
const models = require('../models');

controller.showHomepage = async (req, res) => {
    const categories = await models.Category.findAll();
    const secondArray = categories.splice(2,2);
    const thirdArray = categories.splice(1,1);
    res.locals.categoryArray = [
        categories,
        secondArray,
        thirdArray
    ]

    res.render('index');
}

controller.showPage = (req, res, next) => {
    const page = ['cart', 'checkout', 'contact', 'login', 'my-account', 'product-detail', 'product-list', 'wishlist']
    if (page.includes(req.params.page)) {
        return res.render(req.params.page);
    }
    next();
}

module.exports = controller;