'use strict';

const express = require('express');
const mongodb = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectID;

const router = express.Router();

router.get('/:id', (req, res, next) => {
        const id = new objectId(req.params.id);
        const url = 'mongodb://localhost:27017/shopapp';

        mongodb.connect(url, (err, db) => {
            const collection = db.collection('products');

            collection.findOne({_id: id},
                (err, results) => {
                    res.render('productView', {
                        result: results,
                        url: req.originalUrl,
                    });
                }
            );
        });
});

module.exports = router;