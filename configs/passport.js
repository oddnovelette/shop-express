'use strict';

const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        err ? done(err)
            : done(null, user);
    });
});

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    req.checkBody('email', 'This email is invalid').notEmpty().isEmail();
    req.checkBody('password', 'This password is invalid').notEmpty().isLength( {min: 6} );
    let errors = req.validationErrors();
    if (errors) {
        let messages = [];
        errors.forEach(function(error) {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    User.findOne({'email': email}, function (err, user) {
        if (err) return done(err);

        if (user) return done(null, false, {message: 'Email is already in use.'});

        const newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptUserPassword(password);
        newUser.save((err, result) => {
            if (err) {
                return done(err);
            }
            return done(null, newUser);
        });
    });
}));

passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid password').notEmpty();
    let errors = req.validationErrors();
    if (errors) {
        let messages = [];
        errors.forEach(function(error) {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    User.findOne({'email': email}, function (err, user) {
        if (err) return done(err);

        if (!user) return done(null, false, { message: 'User not found' });

        if (!user.validateUserPassword(password)) {
            return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
    });
}));