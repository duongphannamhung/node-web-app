'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const models = require('../models');
        const bcrypt = require('bcrypt');

        let users = await models.User.findAll();
        let updatedUsers= [];
        users.forEach(item => {
            updatedUsers.push({
                id: item.id,
                password: bcrypt.hashSync("dimotngaydang", 13)
            })
        })
        await models.User.bulkCreate(updatedUsers, {
            updateOnDuplicate: ['password']
        })
    },

    async down(queryInterface, Sequelize) {

    }
};
