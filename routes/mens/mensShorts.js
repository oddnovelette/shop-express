var express = require('express');
var mensShortsRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var router = function (nav) {
    mensShortsRouter.route('/')
        .get(function (req, res) {
            var url = 'mongodb://localhost:27017/shopapp';

            mongodb.connect(url, function (err, db) {
                var collection = db.collection('products');

                collection.aggregate([
                    {$match: {'primary_category_id': 'mens-clothing-shorts'}},
                    {$unwind:  {path: '$image_groups'}},
                    {$unwind:  {path: '$image_groups.images'}},
                    {$match: {'image_groups.view_type': 'large'}},
                    {$group: {
                        _id: '$_id',
                        img: {$first: '$image_groups.images.link'},
                        name: {$first: '$name'},
                        price: {$first:'$price'},
                        currency: {$first:'$currency'},
                        short_description:{$first: '$short_description'}
                    }}
                ]).toArray(
                    function (err, results) {
                        res.render('productsView', {
                            title: 'Mens Shorts',
                            pre: 'Mens Clothing',
                            nav: nav,
                            prefix: '/mens-clothing-shorts/',
                            result: results
                        });
                    }
                );
            });
        });

    mensShortsRouter.route('/:id')
        .get(function (req, res) {
            var id = new objectId(req.params.id);
            var url = 'mongodb://localhost:27017/shopapp';

            mongodb.connect(url, function (err, db) {
                var collection = db.collection('products');

                collection.findOne({_id: id},
                    function (err, results) {
                        res.render('productView', {
                            pre: 'Mens Clothing',
                            title: 'Mens Shorts',
                            nav: nav,
                            result: results
                        });
                    }
                );
            });
        });

    return mensShortsRouter;
};
module.exports = router;