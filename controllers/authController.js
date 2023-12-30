'user strict'

const controller = {};
const passport = require('passport');

controller.show = (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/');
    }
    res.render('login', { loginMessage: req.flash('loginMessage'), reqUrl: req.query.reqUrl});
}

controller.login = (req, res, next) => {
    let keepSignedIn = req.body.keepSignedIn;
    let reqUrl = req.body.reqUrl ? req.body.reqUrl : '/users/my-account'
    let cart = req.session.cart;
    passport.authenticate('local-login', (error, user) => {
        if (error) {
            return next(error);
        }
        if (!user) {
            return res.redirect(`'/users/loginreqUrl=${reqUrl}'`);
        }
        req.logIn(user, (error) => {
            if (error) {
                return next(error);
            }
            req.session.cookie.maxAge = keepSignedIn ? 24 * 60 * 60 * 1000 : null;
            req.session.cart = cart;
            return res.redirect(reqUrl);
        })
    })(req, res, next);
};

controller.logout = (req, res) => {
    let cart = req.session.cart;
    req.logout((error)=>{
        if (error) {return next(error);}
        req.session.cart = cart;
        res.redirect('/');
    })
}

controller.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect(`/users/login?reqUrl=${req.originalUrl}`);
}

module.exports = controller;