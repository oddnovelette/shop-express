'use strict';

const express = require('express');
const router = express.Router();
const signup = require('./users/signup');
const signin = require('./users/signin');
const mens = require('./mens/mens');
const womens = require('./womens/womens');
const passport = require('passport');
const csurf = require('csurf');
const mongodb = require('mongodb').MongoClient;
const csrf = csurf();
router.use(csrf);

router.get('/', (req, res, next) => {
    const url = 'mongodb://localhost:27017/shopapp';

    mongodb.connect(url, (err, db) => {
        const collection = db.collection('categories');

        collection.find({}).toArray((err, results) => {
                res.render('index', {result: results});
        });
    });
});


router.get('/profile', isLoggedIn, (req, res, next) => res.render('users/profile'));

router.get('/logout', isLoggedIn, (req, res, next) => {
    req.logout();
    res.redirect('/');
});
router.get('/to-cart/:id', (req, res, next) => {
   let productId = req.params.id;
});

router.use('/', notLoggedIn, (req, res, next) => next());

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/');
}
function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) return next();
    res.redirect('/');
}
router.use('/signin', signin);
router.use('/signup', signup);
router.use('/mens', mens);
router.use('/womens', womens);
module.exports = router;
