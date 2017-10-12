'use strict';

const express = require('express');
const womensScarves = require('../womens/womensScarves');
const womensShoes = require('../womens/womensShoes');
const mongodb = require('mongodb').MongoClient;

const router = express.Router();

router.get('/', (req, res, next) => {
    const url = 'mongodb://localhost:27017/shopapp';

    mongodb.connect(url, (err, db) => {
        const collection = db.collection('categories');

        collection.aggregate([
            {$unwind:  {path: '$categories'}},
            {$unwind:  {path: '$categories.categories'}},
            {$match: {'categories.categories.parent_category_id': 'mens-accessories'}}
        ])
            .toArray((err, results) => {
                res.render('categsSubView', {result: results}
                )});
    });
});

router.use('/womens-accessories-scarves', womensScarves);
router.use('/womens-accessories-shoes', womensShoes);
module.exports = router;
