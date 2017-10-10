var express = require('express');
var womensAccessoriesRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var router = function (nav) {
    womensAccessoriesRouter.route('/')
        .get(function (req, res) {
            var url = 'mongodb://localhost:27017/shopapp';

            mongodb.connect(url, function (err, db) {
                var collection = db.collection('categories');

                collection.aggregate([
                    {$unwind:  {path: '$categories'}},
                    {$unwind:  {path: '$categories.categories', preserveNullAndEmptyArrays: true}},
                    {$match: {'categories.categories.parent_category_id': 'womens-accessories'}}
                ]).toArray(
                    function (err, results) {
                        res.render('categsSubView', {
                            title: 'Women\'s Accessories',
                            pre: 'Womens',
                            nav: nav,
                            result: results
                        });
                    }
                );
            });
        });

    return womensAccessoriesRouter;
};
module.exports = router;
