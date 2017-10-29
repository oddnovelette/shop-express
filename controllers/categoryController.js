'use strict';

const Category = require('../models/Category');

/**
 * Render the homepage
 *
 * @module index
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @return {undefined}
 */
exports.index = (req, res, next) => {
    Category.find( {}, 'page_title page_description',
        (err, results) => {
        if (err) { return next(err); }
        res.render('index', {result: results});
    });
};

/**
 * Render the category
 *
 * @module category
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @return {undefined}
 */
exports.category = (req, res, next) => {
        Category.aggregate([
            {$unwind: '$categories'},
            {$match: {'categories.parent_category_id': req.params.cat}}
        ],
        (err, results) => {
            if (err) { return next(err); }
            res.render('categsView', {result: results} );
        });
};

/**
 * Render the subcategory
 *
 * @module subcategory
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @return {undefined}
 */
exports.subcategory = (req, res, next) => {
    Category.aggregate([
            {$unwind: '$categories'},
            {$unwind: '$categories.categories'},
            {$match: {'categories.categories.parent_category_id': req.params.subcat}}
        ],
        (err, results) => {
            if (err) { return next(err); }
            res.render('categsSubView', {result: results} );
        });
};
