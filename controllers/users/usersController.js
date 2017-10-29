'use strict';

const Order = require('../../models/Order');
const Cart = require('../../models/Cart');
const User = require('../../models/User');
const Wishlist = require('../../models/Wishlist');

/**
 * Render profile for users
 *
 * @module profile
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @return {undefined}
 */
exports.profile = (req, res, next) => {
    Order.find({
        user: req.user
    }, (err, orders) => {
        if (err) return res.write('Error occurred');

        if (!req.session.wishlist) {
            return res.render('users/profile', {
                csrfToken: req.csrfToken(),
                user: req.user,
                products: null
            });
        }

        let wishlist = new Wishlist(req.session.wishlist);
        res.render('users/profile', {
            csrfToken: req.csrfToken(),
            products: wishlist.generateArray(),
            user: req.user
        });
    });
};

/**
 * Handle the user account credentials updating
 *
 * @module profile_post
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @return {undefined}
 */
exports.profile_post = (req, res, next) => {
    if (req.body.email) {
        User.findOne({ email: req.body.email },

            (err, doc) => {
            if (err) req.flash('error', 'Error occurred');

            doc.name = req.body.name;
            doc.email = req.body.email;

            doc.save();
        });
    }
    if (req.session.oldUrl) {
        let oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect('/users/profile');
    }
    res.end();
};

/**
 * Completely delete user's account
 *
 * @module delete_account
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @return {undefined}
 */
exports.delete_account = (req, res, next) => {

    User.findOneAndRemove({ email: req.user.email },

        (err, success) => {
        if (err) req.flash('error', 'Unable to remove');

        if (success) {
            req.flash('success', 'Account has been deleted');
            res.redirect('/');
        }
    });
};