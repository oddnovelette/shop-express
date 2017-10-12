'use strict';

const express = require('express');
const mensGloves = require('../mens/mensGloves');
const mensLuggage = require('../mens/mensLuggage');
const mensTies = require('../mens/mensTies');
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

router.use('/mens-accessories-gloves', mensGloves);
router.use('/mens-accessories-luggage', mensLuggage);
router.use('/mens-accessories-ties', mensTies);

module.exports = router;
