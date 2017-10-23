'use strict';

const passport = require('passport');

exports.signin = (req, res, next) => {
    let messages = req.flash('error');
    res.render('users/signin', {
        csrfToken: req.csrfToken(),
        messages: messages,
        hasErrors: messages.length > 0
    });
};

exports.signin_post = (req, res, next) => {
        if (req.session.oldUrl) {
            let oldUrl = req.session.oldUrl;
            req.session.oldUrl = null;
            res.redirect(oldUrl);
        } else {
            res.redirect('/users/profile');
        }
};

exports.signup = (req, res, next) => {
    let messages = req.flash('error');
    res.render('users/signup', {
        csrfToken: req.csrfToken(),
        messages: messages,
        hasErrors: messages.length > 0
    });
};

exports.signup_post = (req, res, next) => {
    if (req.session.oldUrl) {
        let oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect('/users/profile');
    }
};

exports.logout = (req, res, next) => {
    req.logout();
    res.redirect('/');
};