'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/authController');
const {body, getErrorMessage} = require('../controllers/validator');

router.get('/login', controller.show);
router.post('/login', 
    body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email address!'), 
    body('password').trim().notEmpty().withMessage('Password is required'),
    (req, res, next) => {
        let message = getErrorMessage(req);
        if (message) {
            return res.render('lgoin', { loginMessage: message })
        }
        next();
    },
    controller.login);

router.get('/logout', controller.logout);
router.post('/register', 
    body('firstName').trim().notEmpty().withMessage('First name is required'),
    body('lastName').trim().notEmpty().withMessage('Last name is required'),
    body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email address!'),
    body('password').trim().notEmpty().withMessage('Password is required'),
    body('password').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).withMessage('Password must be at least 8 characters and contain at least one letter and one number!'),
    body('confirmPassword').custom((confirmPassword, {req}) => {
        if (confirmPassword !== req.body.password) {
            throw new Error('Password confirmation does not match password!');
        }
        return true;
    }),
    
    (req, res, next) => {
        let message = getErrorMessage(req);
        if (message) {
            return res.render('login', { registerMessage: message })
        }
        next();   
    },  
    controller.register);

module.exports = router;