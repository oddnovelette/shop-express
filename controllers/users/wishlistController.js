'use strict';

const Wishlist = require('../../models/Wishlist');
const Product  = require('../../models/Product');

/**
 * Adds the items to user's wishlist
 *
 * @module to_wishlist
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @return {undefined}
 */
exports.to_wishlist = (req, res, next) => {
    let productId = req.params.id;
    let wishlist = new Wishlist(req.session.wishlist ? req.session.wishlist : {});

    Product.findById(productId, (err, product) => {
        if (err) return res.redirect('/');

        wishlist.add(product, product.id);
        req.session.wishlist = wishlist;
        res.redirect('/users/profile');
    });
};