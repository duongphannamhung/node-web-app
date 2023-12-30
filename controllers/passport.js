'use strict'

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const models = require('../models');
const { where } = require('sequelize');

// ham duoc goi khi xac thuc thanh cong, luu thong tin user vao session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// ham duoc goi boi passport.session(), tra ve thong tin user tu csdl dua vao id
passport.deserializeUser(async (id, done) => {
    try {
        const user = await models.User.findOne({
            attributes: ['id', 'email', 'firstName','lastName', 'mobile', 'isAdmin'],
            where: {
                id: id
            }
        });
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

// ham xac thuc nguoi dung khi dang nhap
passport.use('local-login', new LocalStrategy({
    usernameField: 'email', // ten dang nhap la email
    passwordField: 'password',
    passReqToCallback: true // cho phep chung ta truyen req vao callback
}, async (req, email, password, done) => {
    if (email) {
        email = email.toLowerCase(); // chuyen dia chi email sang ky tu thuong        
    }
    try {
        if (!req.user) { // neu user chua dang nhap
            let user = await models.User.findOne({
                where: { email: email}
            })
            if (!user) {
                return done(null, false, req.flash('loginMessage', 'Email does not exist!'))
            }
            if (!bcrypt.compareSync(password, user.password)) {
                return done(null, false, req.flash('loginMessage', 'Password is incorrect!'))
            }
            return done(null, user);
        }
        done(null ,req.user)
    } catch (error) {
        done(error);
    }
}))

passport.use('local-register', new LocalStrategy({
    usernameField: 'email', // ten dang nhap la email
    passwordField: 'password',
    passReqToCallback: true // cho phep chung ta truyen req vao callback
}, async (req, email, password, done) => {
    if (email) {
        email = email.toLowerCase(); // chuyen dia chi email sang ky tu thuong
    }   
    if (req.user) {
        return done(null, req.user);
    }
    try {
        let user = await models.User.findOne({
            where: { email: email}
        })
        if (user ) {
            return done(null, false, req.flash('registerMessage', 'Email existed!'))
        }

        user = await models.User.create({
            email: email,
            password: bcrypt.hashSync(password, 8),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            mobile: req.body.mobile,
            isAdmin: false
        });
        done(null, false, req.flash('registerMessage', 'Register successfully!'));
    } catch (error) {
        done(error);
    }
}))

module.exports = passport;