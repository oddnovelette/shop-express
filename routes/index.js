var express = require('express');
var router = express.Router();
var mongodb = require('mongodb').MongoClient;


router.get('/', function(req, res) {
    var url = 'mongodb://localhost:27017/shopapp';

    mongodb.connect(url, function (err, db) {
        var collection = db.collection('categories');

        collection.find({}).toArray(
            function (err, results) {
                res.render('index', {
                    title: 'ShopApp',
                    result: results,
                    nav: [{
                        Link: '/mens',
                        Text: 'Mens'
                    }, {
                        Link: '/womens',
                        Text: 'Womens'
                    }]
                    }
                );
            }
        );
    });
});

module.exports = router;
