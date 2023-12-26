'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');    

router.get('/checkout', controller.checkout);

module.exports = router;