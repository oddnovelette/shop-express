var express = require('express');
var mensAccessoriesRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var router = function (nav) {
    mensAccessoriesRouter.route('/')
        .get(function (req, res) {
            var url = 'mongodb://localhost:27017/shopapp';

            mongodb.connect(url, function (err, db) {
                var collection = db.collection('categories');

                collection.aggregate([
                    {$unwind:  {path: '$categories'}},
                    {$unwind:  {path: '$categories.categories', preserveNullAndEmptyArrays: true}},
                    {$match: {'categories.categories.parent_category_id': 'mens-accessories'}}
                ]).toArray(
                    function (err, results) {
                        res.render('categsSubView', {
                            title: 'Mens Accessories',
                            pre: 'Mens',
                            nav: nav,
                            result: results
                        });
                    }
                );
            });
        });

    return mensAccessoriesRouter;
};
module.exports = router;
