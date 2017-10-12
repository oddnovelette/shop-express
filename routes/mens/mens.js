'use strict';

const express = require('express');
const mensClothing = require('../mens/mensClothing');
const mensAccessories = require('../mens/mensAccessories');
const mongodb = require('mongodb').MongoClient;

const router = express.Router();
router.get('/', (req, res, next) => {
    const url = 'mongodb://localhost:27017/shopapp';

    mongodb.connect(url, (err, db) => {
        const collection = db.collection('categories');

        collection.aggregate([
            {$unwind: '$categories'},
            {$match: {'categories.parent_category_id': 'mens'}}
        ])
            .toArray((err, results) => {
            res.render('categsView', {result: results}
            );
        });
    });
});

router.use('/mens-clothing', mensClothing);
router.use('/mens-accessories', mensAccessories);
module.exports = router;
