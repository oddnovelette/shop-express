'use strict';

const express   = require('express');
const router    = express.Router();
const csrf      = require('csurf');
const passport  = require('passport');

const authController        = require('../controllers/users/authController');
const usersController       = require('../controllers/users/usersController');
const forgotController      = require('../controllers/users/forgotController');

const csrfProtection = csrf();

router.post('/users/delete', usersController.delete_account);

router.get('/users/forgot', forgotController.forgot);
router.post('/users/forgot', forgotController.forgot_post);

router.get('/users/reset/:token', forgotController.reset_token);
router.post('/users/reset/:token', forgotController.reset_token_post);

router.use(csrfProtection);


router.get('/users/signin', authController.signin);
router.post('/users/signin', passport.authenticate('local.signin', {
    failureRedirect: '/users/signin',
    failureFlash: true
}), authController.signin_post);


router.get('/users/signup', authController.signup);
router.post('/users/signup', passport.authenticate('local.signup', {
    failureRedirect: '/users/signup',
    failureFlash: true
}), authController.signup_post);


router.get('/users/profile', isLoggedIn, usersController.profile);
router.post('/users/profile', usersController.profile_post);

router.get('/users/logout', isLoggedIn, authController.logout);

router.get('/auth/google', passport.authenticate('google', {scope:
    ['https://www.googleapis.com/auth/plus.login']}));

router.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/users/profile',
    failureRedirect: '/'
}));

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    req.flash('error', 'Sign in to continue..');
    res.redirect('/users/signin');
}