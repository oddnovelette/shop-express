'use strict';

const Product = require('../models/Product');
const mongodb = require('mongodb').MongoClient;
const fx = require('money');
const objectId  = require('mongodb').ObjectID;

/**
 * Render the product page
 *
 * @module item
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @return {undefined}
 */
exports.item = (req, res, next) => {
    const id = new objectId(req.params.id);

    const url = 'mongodb://localhost:27017/shopapp';

    mongodb.connect(url, (err, db) => {
        const collection = db.collection('products');

        collection.aggregate([
            {$match: {'_id': id}},
            {$unwind: {path: '$image_groups'}},
            {$unwind: {path: '$image_groups.images'}},
            {$match: {'image_groups.view_type': 'large'}},
            {$group: {
                _id: '$id',
                img: {$first: '$image_groups.images.link'},
                img2: {$last: '$image_groups.images.link'},
                imgalt: {$first: '$image_groups.images.alt'},
                id: {$first: '$id'},
                name: {$first: '$name'},
                price: {$first:'$price'},
                currency: {$first:'$currency'},
                long_description:{$first: '$long_description'}
            }}
        ]).toArray((err, results) => {
            fx.base = "USD";
            fx.rates = {"EUR" : 0.8380, "CAD" : 0.7885, "GBR" : 1.3202, "USD" : 1};
            let eur = fx.convert(results[0].price, {from: "USD", to: "EUR"});
            let cad = fx.convert(results[0].price, {from: "USD", to: "CAD"});
            let gbr = fx.convert(results[0].price, {from: "USD", to: "GBR"});

            if (err) { return next(err); }
                res.render('productView', {
                    result: results,
                    eur: eur, cad: cad, gbr: gbr,
                    pid: id,
                    url: req.originalUrl,
                });
            }
        );
    });
};
