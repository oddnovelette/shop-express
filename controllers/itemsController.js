'use strict';

const Product = require('../models/Product');

exports.items = (req, res, next) => {

        Product.aggregate([
            {$match: {'primary_category_id': req.params.primary}},
            {$unwind: {path: '$image_groups'}},
            {$unwind: {path: '$image_groups.images'}},
            {$match: {'image_groups.view_type': 'medium'}},
            {$group: {
                _id: '$_id',
                img: {$first: '$image_groups.images.link'},
                name: {$first: '$name'},
                price: {$first:'$price'},
                currency: {$first:'$currency'},
                short_description:{$first: '$short_description'}
            }}
        ],
            (err, results) => {
            if (err) { return next(err); }
            res.render('productsView', {
                result: results,
                url: req.originalUrl
            });
        });
};