'use strict';

const Product = require('../models/Product');
const mongodb   = require('mongodb').MongoClient;
const objectId  = require('mongodb').ObjectID;

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
            if (err) { return next(err); }
                res.render('productView', {
                    result: results,
                    pid: id,
                    url: req.originalUrl,
                });
            }
        );
    });
};
