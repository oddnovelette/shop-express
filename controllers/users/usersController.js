'use strict';

const Order = require('../../models/Order');
const Cart = require('../../models/Cart');
const User = require('../../models/User');

exports.profile = (req, res, next) => {
    Order.find({
        user: req.user
    }, (err, orders) => {
        if (err) return res.write('Error occurred');

        let cart;
        orders.forEach((order) => {
            cart = new Cart(order.cart);
            order.items = cart.generateArray();
        });
        res.render('users/profile', {
            csrfToken: req.csrfToken(),
            orders: orders,
            user: req.user
        });
    });
};

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