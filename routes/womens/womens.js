var express = require('express');
var womensRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var router = function (nav) {
    womensRouter.route('/')
        .get(function (req, res) {
            var url = 'mongodb://localhost:27017/shopapp';

            mongodb.connect(url, function (err, db) {
                var collection = db.collection('categories');

                collection.aggregate([
                    {$unwind: '$categories'},
                    {$match: {'categories.parent_category_id': 'womens'}}
                ]).toArray(
                    function (err, results) {
                        res.render('categsView', {
                            title: 'Women\'s',
                            nav: nav,
                            result: results
                        });
                    }
                );
            });
        });

    return womensRouter;
};
module.exports = router;
