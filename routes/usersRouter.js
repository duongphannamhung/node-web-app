'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');    
const {body, validationResult} = require('express-validator');
const authController = require('../controllers/authController');

router.use(authController.isLoggedIn);
router.get('/checkout', controller.checkout);
router.post('/placeorders', 
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email'),
    body('mobile').notEmpty().withMessage('Mobile is required'),
    body('address').notEmpty().withMessage('Address is required'),
    (req, res, next) => {
        let errors = validationResult(req);
        if (req.body.addressId == "on" && !errors.isEmpty()){
            let errorArray = errors.array();
            let message = '';
            for (let i=0; i <errorArray.length; i++) {
                message += errorArray[i].msg + '<br/>';
            }
            return res.render('error', {message})
        }
        next();
    },
controller.placeorders
);

router.get('/my-account', (req, res) => {
    res.render('my-account');
});

module.exports = router;