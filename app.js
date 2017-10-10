var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var nav = [{
    Link: '/mens',
    Text: 'Mens'
}, {
    Link: '/womens',
    Text: 'Womens'
}];
/* GET home page. */

var index = require('./routes/index');
var mensRouter = require('./routes/mens/mens')(nav);
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

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

app.use('/', index);
app.use('/mens', mensRouter);
app.use('/mens-clothing', mensClothingRouter);
app.use('/mens-clothing-suits', mensSuitsRouter);
app.use('/mens-accessories', mensAccessoriesRouter);
app.use('/mens-clothing-dress-shirts', mensDressRouter);
app.use('/mens-clothing-shorts', mensShortsRouter);
app.use('/mens-clothing-jackets', mensJacketsRouter);
app.use('/mens-clothing-pants', mensPantsRouter);
app.use('/mens-accessories-ties', mensTiesRouter);
app.use('/mens-accessories-gloves', mensGlovesRouter);
app.use('/mens-accessories-luggage', mensLuggageRouter);

app.use('/womens', womensRouter);
app.use('/womens-clothing', womensClothingRouter);
app.use('/womens-jewelry', womensJewelryRouter);
app.use('/womens-accessories', womensAccessoriesRouter);
app.use('/womens-outfits', womensOutfitsRouter);
app.use('/womens-clothing-tops', womensTopsRouter);
app.use('/womens-clothing-dresses', womensDressesRouter);
app.use('/womens-clothing-bottoms', womensBottomsRouter);
app.use('/womens-clothing-jackets', womensJacketsRouter);
app.use('/womens-clothing-feeling-red', womensRedRouter);
app.use('/womens-jewelry-earrings', womensEarringsRouter);
app.use('/womens-jewlery-bracelets', womensBraceletsRouter);
app.use('/womens-jewelry-necklaces', womensNecklacesRouter);
app.use('/womens-accessories-necklaces', womensScarvesRouter);
app.use('/womens-accessories-shoes', womensShoesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
