'use strict';

const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const csurf = require('csurf');
const breadcrumb = require('express-url-breadcrumb');


/* GET home page. */

//var index = require('./routes/index');
//var mensRouter = require('./routes/mens/mens')(nav);
/*
var mensClothingRouter = require('./routes/mens/mensClothing')(nav);
var mensAccessoriesRouter = require('./routes/mens/mensAccessories')(nav);
var mensDressRouter = require('./routes/mens/mensDress')(nav);
var mensShortsRouter = require('./routes/mens/mensShorts')(nav);
var mensJacketsRouter = require('./routes/mens/mensJackets')(nav);
var mensSuitsRouter = require('./routes/mens/mensSuits')(nav);
var mensPantsRouter = require('./routes/mens/mensPants')(nav);
var mensTiesRouter = require('./routes/mens/mensTies')(nav);
var mensGlovesRouter = require('./routes/mens/mensGloves')(nav);
var mensLuggageRouter = require('./routes/mens/mensLuggage')(nav);

var womensRouter = require('./routes/womens/womens')(nav);
var womensClothingRouter = require('./routes/womens/womensClothing')(nav);
var womensJewelryRouter = require('./routes/womens/womensJewelry')(nav);
var womensAccessoriesRouter = require('./routes/womens/womensAccessories')(nav);
var womensOutfitsRouter = require('./routes/womens/womensOutfits')(nav);
var womensTopsRouter = require('./routes/womens/womensTops')(nav);
var womensDressesRouter = require('./routes/womens/womensDresses')(nav);
var womensBottomsRouter = require('./routes/womens/womensBottoms')(nav);
var womensJacketsRouter = require('./routes/womens/womensJackets')(nav);
var womensRedRouter = require('./routes/womens/womensRed')(nav);
var womensEarringsRouter = require('./routes/womens/womensRed')(nav);
var womensBraceletsRouter = require('./routes/womens/womensBracelets')(nav);
var womensNecklacesRouter = require('./routes/womens/womensNecklaces')(nav);
var womensScarvesRouter = require('./routes/womens/womensScarves')(nav);
var womensShoesRouter = require('./routes/womens/womensShoes')(nav);
*/
const app = express();

// Setting up menu
app.use((req, res, next) => {
    res.locals.nav = [
        {Link: '/', Text: 'Home'},
        {Link: '/mens', Text: 'Mens'},
        {Link: '/womens', Text: 'Womens'},
        {Link: '/signin', Text: 'Sign in'},
        {Link: '/signup', Text: 'Sign up'}
        ];
    next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'jfuerjevnerojblapmt',
    resave: false,
    saveUninitialized: false
}));
//const csrf = csurf();
//router.use(csrf);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

app.use(breadcrumb());
app.use('/', require('./routes/index'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
