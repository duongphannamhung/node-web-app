'use strict'

const controller = {};
const models = require('../models');

controller.checkout = async (req, res) => {
    if (req.session.cart.quantity > 0)
    {        
        let userId = 1; // TODO: get user id from session
        res.locals.addresses = await models.Address.findAll({where: {userId:userId}});

        res.locals.cart = req.session.cart.getCart();
        res.render('checkout');}
    res.redirect('/products');
}

module.exports = controller;