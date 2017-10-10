var express = require('express');
var womensClothingRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var router = function (nav) {
    womensClothingRouter.route('/')
        .get(function (req, res) {
            var url = 'mongodb://localhost:27017/shopapp';

            mongodb.connect(url, function (err, db) {
                var collection = db.collection('categories');

                collection.aggregate([
                    {$unwind:  {path: '$categories'}},
                    {$unwind:  {path: '$categories.categories', preserveNullAndEmptyArrays: true}},
                    {$match: {'categories.categories.parent_category_id': 'womens-clothing'}}
                ]).toArray(
                    function (err, results) {
                        res.render('categsSubView', {
                            title: 'Women\'s Clothing',
                            pre: 'Womens',
                            nav: nav,
                            result: results
                        });
                    }
                );
            });
        });

    return womensClothingRouter;
};
module.exports = router;
