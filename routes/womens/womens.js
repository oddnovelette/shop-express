'use strict';

const express = require('express');
const womensClothing = require('../womens/womensClothing');
const womensJewelry = require('../womens/womensJewelry');
const womensAccessories = require('../womens/womensAccessories');
const mongodb = require('mongodb').MongoClient;

const router = express.Router();
router.get('/', (req, res, next) => {
    const url = 'mongodb://localhost:27017/shopapp';

    mongodb.connect(url, (err, db) => {
        const collection = db.collection('categories');

        collection.aggregate([
            {$unwind: '$categories'},
            {$match: {'categories.parent_category_id': 'womens'}}
        ])
            .toArray((err, results) => {
                res.render('categsView', {result: results}
                );
            });
    });
});

router.use('/womens-clothing', womensClothing);
router.use('/womens-jewelry', womensJewelry);
router.use('/womens-accessories', womensAccessories);
module.exports = router;
