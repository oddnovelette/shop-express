'use strict';

const express       = require('express');
const path          = require('path');
const favicon       = require('serve-favicon');
const logger        = require('morgan');
const cookieParser  = require('cookie-parser');
const bodyParser    = require('body-parser');
const csurf         = require('csurf');
const breadcrumb    = require('express-url-breadcrumb');
const mongoose      = require('mongoose');
const session       = require('express-session');
const passport      = require('passport');
const flash         = require('connect-flash');
const validator     = require('express-validator');
const MongoStore    = require('connect-mongo')(session);

const app = express();

mongoose.connect('localhost:27017/shopapp');
require('./configs/passport');

// Setting up menu
app.use((req, res, next) => {
    res.locals.nav = [
        {Link: '/', Text: 'Home'},
        {Link: '/mens', Text: 'Mens'},
        {Link: '/womens', Text: 'Womens'}
        ];
    next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(validator());
app.use(cookieParser('secret'));
app.use(session({
    secret: 'jfuerje',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 180 * 60 * 1000 }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

/*--------------------------------------------*/

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

app.use(breadcrumb());

app.use((req, res, next) => {
    res.locals.success  = req.flash('success');
    res.locals.error    = req.flash('error');
    res.locals.login    = req.isAuthenticated();
    res.locals.session  = req.session;
    next();
});

app.use('/', require('./routes/catalog'));
app.use('/', require('./routes/user'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
