'use strict';

const express = require('express');
const mens = require('./mens/mens');
const womens = require('./womens/womens');
const mongodb = require('mongodb').MongoClient;

const router = express.Router();
    router.get('/', (req, res, next) => {
        const url = 'mongodb://localhost:27017/shopapp';

        mongodb.connect(url, (err, db) => {
            const collection = db.collection('categories');

            collection.find({}).toArray((err, results) => {
                res.render('index', {result: results});
            });
        });
    });

router.use('/mens', mens);
router.use('/womens', womens);
module.exports = router;
