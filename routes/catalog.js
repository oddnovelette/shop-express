'use strict';

const express   = require('express');
const router    = express.Router();
const csrf      = require('csurf');
const passport  = require('passport');

const categoryController    = require('../controllers/categoryController');
const itemsController       = require('../controllers/itemsController');
const itemController        = require('../controllers/itemController');
const authController        = require('../controllers/users/authController');
const usersController       = require('../controllers/users/usersController');
const cartController        = require('../controllers/users/cartController');

const csrfProtection = csrf();

//------------------User routes-----------------------------------

router.post('/users/delete', usersController.delete_account);
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

//------------------Cart routes--------------------------------

router.get('/shopping-cart/', cartController.cart);
router.get('/to-cart/:id', cartController.to_cart);
//router.get('/reduce/:id', cartController.decrease);
//router.get('/remove/:id', cartController.remove);


//------------------Catalog routes--------------------------------

router.get('/', categoryController.index);
router.get('/:cat', categoryController.category);
router.get('/:cat/:subcat', categoryController.subcategory);
router.get('/:cat/:subcat/:primary', itemsController.items);
router.get('/:cat/:subcat/:primary/:id', itemController.item);

router.use('/', notLoggedIn, (req, res, next) => next());

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/');
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) return next();
    res.redirect('/');
}