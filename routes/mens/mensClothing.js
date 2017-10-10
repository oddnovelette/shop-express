var express = require('express');
var mensClothingRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var router = function (nav) {
    mensClothingRouter.route('/')
        .get(function (req, res) {
            var url = 'mongodb://localhost:27017/shopapp';

            mongodb.connect(url, function (err, db) {
                var collection = db.collection('categories');

                collection.aggregate([
                    {$unwind:  {path: '$categories'}},
                    {$unwind:  {path: '$categories.categories', preserveNullAndEmptyArrays: true}},
                    {$match: {'categories.categories.parent_category_id': 'mens-clothing'}}
                ]).toArray(
                    function (err, results) {
                        res.render('categsSubView', {
                            title: 'Mens Clothing',
                            pre: 'Mens',
                            nav: nav,
                            result: results
                        });
                    }
                );
            });
        });

    return mensClothingRouter;
};
module.exports = router;
