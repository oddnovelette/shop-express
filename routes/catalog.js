'use strict';

const express   = require('express');
const router    = express.Router();
const csrf      = require('csurf');

const categoryController    = require('../controllers/categoryController');
const itemsController       = require('../controllers/itemsController');
const itemController        = require('../controllers/itemController');
const cartController        = require('../controllers/users/cartController');
const wishlistController    = require('../controllers/users/wishlistController');

const csrfProtection = csrf();
router.use(csrfProtection);


router.get('/shopping-cart/', cartController.cart);
router.get('/to-cart/:id', isLoggedIn, cartController.to_cart);
router.get('/to-wishlist/:id', isLoggedIn, wishlistController.to_wishlist);

router.get('/', categoryController.index);
router.get('/:cat', categoryController.category);
router.get('/:cat/:subcat', categoryController.subcategory);
router.get('/:cat/:subcat/:primary', itemsController.items);
router.get('/:cat/:subcat/:primary/:id', itemController.item);

router.use('/', notLoggedIn, (req, res, next) => next());

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    req.flash('error', 'Sign in to continue..');
    res.redirect('/users/signin');
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) return next();
    res.redirect('/');
}