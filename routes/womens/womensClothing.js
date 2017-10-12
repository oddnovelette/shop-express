'use strict';

const express = require('express');
const womensOutfits = require('../womens/womensOutfits');
const womensTops = require('../womens/womensTops');
const womensDresses = require('../womens/womensDresses');
const womensBottoms = require('../womens/womensDresses');
const womensFeelingRed = require('../womens/womensRed');
const mongodb = require('mongodb').MongoClient;

const router = express.Router();

router.get('/', (req, res, next) => {
    const url = 'mongodb://localhost:27017/shopapp';

    mongodb.connect(url, (err, db) => {
        const collection = db.collection('categories');

        collection.aggregate([
            {$unwind:  {path: '$categories'}},
            {$unwind:  {path: '$categories.categories'}},
            {$match: {'categories.categories.parent_category_id': 'womens-clothing'}}
        ])
            .toArray((err, results) => {
                res.render('categsSubView', {result: results}
                )});
    });
});

router.use('/womens-outfits', womensOutfits);
router.use('/womens-clothing-tops', womensTops);
router.use('/womens-clothing-dresses', womensDresses);
router.use('/womens-clothing-bottoms', womensBottoms);
router.use('/womens-clothing-feeling-red', womensFeelingRed);
module.exports = router;
