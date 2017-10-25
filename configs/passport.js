'use strict';

const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const configAuth = require('./auth');


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
        errors.forEach((error) => {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    User.findOne({'email': email}, (err, user) => {
        if (err) return done(err);

        if (user) return done(null, false, {message: 'Email is already in use.'});

        const newUser = new User();
        newUser.name = req.body.name;
        newUser.email = email;
        newUser.password = newUser.encryptUserPassword(password);
        newUser.save((err, result) => {
            if (err) return done(err);
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
        errors.forEach((error) => {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    User.findOne({'email': email}, (err, user) => {
        if (err) return done(err);

        if (!user) return done(null, false, { message: 'User not found' });

        if (!user.validateUserPassword(password)) {
            return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
    });
}));

passport.use(new GoogleStrategy({
        clientID: configAuth.googleAuth.clientID,
        clientSecret: configAuth.googleAuth.clientSecret,
        callbackURL: configAuth.googleAuth.callbackURL
    },
    (accessToken, refreshToken, profile, done) => {
            User.findOne({'google.id': profile.id}, (err, user) => {
                if (err) return done(err);

                if (user) return done(null, user);

                else {
                    let newUser = new User();
                    newUser.name = profile.displayName;
                    newUser.email = 'yourmail@gmail.com';
                    newUser.password = '***';
                    newUser.token = accessToken;

                    newUser.save((err, res) => {
                        if (err) throw err;
                        return done(null, newUser);
                    })
                }
            });
    }
));
