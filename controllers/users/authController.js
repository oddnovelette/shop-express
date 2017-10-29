'use strict';

const passport = require('passport');

/**
 * Local login for users
 *
 * @module signin
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @return {undefined}
 */
exports.signin = (req, res, next) => {
    let messages = req.flash('error');
    res.render('users/signin', {
        csrfToken: req.csrfToken(),
        messages: messages,
        hasErrors: messages.length > 0
    });
};

/**
 * Local login for users - POST handler
 *
 * @module signin_post
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @return {undefined}
 */
exports.signin_post = (req, res, next) => {
        if (req.session.oldUrl) {
            let oldUrl = req.session.oldUrl;
            req.session.oldUrl = null;
            res.redirect(oldUrl);
        } else {
            res.redirect('/users/profile');
        }
};

/**
 * Local signup for new users
 *
 * @module signup
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @return {undefined}
 */
exports.signup = (req, res, next) => {
    let messages = req.flash('error');
    res.render('users/signup', {
        csrfToken: req.csrfToken(),
        messages: messages,
        hasErrors: messages.length > 0
    });
};

/**
 * Local sign up for users - POST handler
 *
 * @module signup_post
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @return {undefined}
 */
exports.signup_post = (req, res, next) => {
    if (req.session.oldUrl) {
        let oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect('/users/profile');
    }
};

/**
 * Logout authorized users
 *
 * @module logout
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @return {undefined}
 */
exports.logout = (req, res, next) => {
    req.logout();
    res.redirect('/');
};