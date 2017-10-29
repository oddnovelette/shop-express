'use strict';

const Cart      = require('../../models/Cart');
const Product   = require('../../models/Product');

/**
 * Adding to cart handler
 *
 * @module to_cart
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @return {undefined}
 */
exports.to_cart = (req, res, next) => {
    let productId = req.params.id;
    let cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, (err, product) => {
        if (err) return res.redirect('/');

        cart.add(product, product.id);
        req.session.cart = cart;
        res.redirect('/');
    });
};

/**
 * Render the cart
 *
 * @module cart
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @return {undefined}
 */
exports.cart = (req, res, next) => {
    if (!req.session.cart) {
        return res.render('users/cart', {
            products: null
        });
    }
    let cart = new Cart(req.session.cart);
    res.render('users/cart', {
        products: cart.generateArray(),
        totalPrice: cart.totalPrice
    });
};