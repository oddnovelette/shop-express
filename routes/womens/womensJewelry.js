var express = require('express');
var womensJewelryRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var router = function (nav) {
    womensJewelryRouter.route('/')
        .get(function (req, res) {
            var url = 'mongodb://localhost:27017/shopapp';

            mongodb.connect(url, function (err, db) {
                var collection = db.collection('categories');

                collection.aggregate([
                    {$unwind:  {path: '$categories'}},
                    {$unwind:  {path: '$categories.categories', preserveNullAndEmptyArrays: true}},
                    {$match: {'categories.categories.parent_category_id': 'womens-jewelry'}},
                ]).toArray(
                    function (err, results) {
                        res.render('categsSubView', {
                            title: 'Womens Jewelry',
                            pre: 'Womens',
                            nav: nav,
                            result: results
                        });
                    }
                );
            });
        });

    return womensJewelryRouter;
};
module.exports = router;
