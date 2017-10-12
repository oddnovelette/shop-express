'use strict';

const express = require('express');
const womensEarrings = require('../womens/womensEarrings');
const womensBracelets = require('../womens/womensBracelets');
const womensNecklaces = require('../womens/womensNecklaces');
const mongodb = require('mongodb').MongoClient;

const router = express.Router();

router.get('/', (req, res, next) => {
    const url = 'mongodb://localhost:27017/shopapp';

    mongodb.connect(url, (err, db) => {
        const collection = db.collection('categories');

        collection.aggregate([
            {$unwind:  {path: '$categories'}},
            {$unwind:  {path: '$categories.categories'}},
            {$match: {'categories.categories.parent_category_id': 'womens-jewelry'}}
        ])
            .toArray((err, results) => {
                res.render('categsSubView', {result: results}
                )});
    });
});

router.use('/womens-jewelry-earrings', womensEarrings);
router.use('/womens-jewlery-bracelets', womensBracelets);
router.use('/womens-jewelry-necklaces', womensNecklaces);
module.exports = router;
