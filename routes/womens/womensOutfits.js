'use strict';

const express = require('express');
const singleProduct = require('../singleProduct');
const mongodb = require('mongodb').MongoClient;

const router = express.Router();

router.get('/', (req, res, next) => {
    const url = 'mongodb://localhost:27017/shopapp';

    mongodb.connect(url, (err, db) => {
        const collection = db.collection('products');

        collection.aggregate([
            {$match: {'primary_category_id': 'womens-outfits'}},
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
        ]).toArray((err, results) => {
                res.render('productsView', {
                    result: results,
                    url: req.originalUrl
                });
            }
        );
    });
});

router.use('/', singleProduct);
module.exports = router;
