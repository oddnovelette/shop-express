var express = require('express');
var mensRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var router = function (nav) {
    mensRouter.route('/')
        .get(function (req, res) {
            var url = 'mongodb://localhost:27017/shopapp';

            mongodb.connect(url, function (err, db) {
                var collection = db.collection('categories');

                collection.aggregate([
                    {$unwind: '$categories'},
                    {$match: {'categories.parent_category_id': 'mens'}}
                ]).toArray(
                    function (err, results) {
                        res.render('categsView', {
                            title: 'Mens',
                            nav: nav,
                            result: results
                        });
                    }
                );
            });
        });

    return mensRouter;
};
module.exports = router;
