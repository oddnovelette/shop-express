'use strict';

const express = require('express');
const mensSuits = require('../mens/mensSuits');
const mensJackets = require('../mens/mensJackets');
const mensDress = require('../mens/mensDress');
const mensShorts = require('../mens/mensShorts');
const mensPants = require('../mens/mensPants');
const mongodb = require('mongodb').MongoClient;

const router = express.Router();

router.get('/', (req, res, next) => {
    const url = 'mongodb://localhost:27017/shopapp';

    mongodb.connect(url, (err, db) => {
        const collection = db.collection('categories');

        collection.aggregate([
            {$unwind:  {path: '$categories'}},
            {$unwind:  {path: '$categories.categories'}},
            {$match: {'categories.categories.parent_category_id': 'mens-clothing'}}
                ])
            .toArray((err, results) => {
                        res.render('categsSubView', {result: results}
                        )});
    });
});

router.use('/mens-clothing-suits', mensSuits);
router.use('/mens-clothing-jackets', mensJackets);
router.use('/mens-clothing-dress-shirts', mensDress);
router.use('/mens-clothing-shorts', mensShorts);
router.use('/mens-clothing-pants', mensPants);

module.exports = router;
