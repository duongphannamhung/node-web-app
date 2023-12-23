'use strict';

const controller = {};

controller.showHomepage = (req, res) => {
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