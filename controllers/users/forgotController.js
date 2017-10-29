'use strict';

const User = require('../../models/User');
const async = require("async");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

exports.forgot = (req, res, next) => {
    res.render('users/forgot');
};

/**
 * Handle the user request for resetting
 *
 * @module forgot_post
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @return {undefined}
 */
exports.forgot_post = (req, res, next) => {
    async.waterfall([
        (done) => {
            crypto.randomBytes(20, (err, buf) => {
                const token = buf.toString('hex');
                done(err, token);
            });
        },
        (token, done) => {
            User.findOne({ email: req.body.email }, (err, user) => {

                if (!user) {
                    req.flash('error', 'No account with that email address exists.');
                    return res.redirect('/users/forgot');
                }
                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000;

                user.save((err) => {
                    done(err, token, user);
                });
            });
        },
        (token, user, done) => {
          const smtpTransport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'deepliam@gmail.com',
                    pass: 'Your password here'
                }
            });
            const mailOptions = {
                to: user.email,
                from: 'deepliam@gmail.com',
                subject: 'ShopApp Password Reset',
                text: 'You are receiving this because you have requested the reset of the password for your account.\n\n' +
                'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                'http://' + req.headers.host + '/users/reset/' + token + '\n\n' +
                'This link can be used once until an hour \n\n' +
                'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            smtpTransport.sendMail(mailOptions, (err) => {
                req.flash('success', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
                done(err, 'done');
            });
        }
    ], (err) => {
        if (err) return next(err);
        res.redirect('/users/forgot');
    });
};

/**
 * Reset token handler on GET
 *
 * @module reset_token
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @return {undefined}
 */
exports.reset_token = (req, res, next) => {
    User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() } },
        (err, user) => {
        if (!user) {
            req.flash('error', 'Password reset token is invalid or has expired.');
            return res.redirect('/users/forgot');
        }
        res.render('users/reset', { token: req.params.token });
    });
};

/**
 * Reset token handler on POST
 *
 * @module delete_account
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @return {undefined}
 */
exports.reset_token_post = (req, res, next) => {
    async.waterfall([
        (done) => {
            User.findOne({
                resetPasswordToken: req.params.token,
                resetPasswordExpires: { $gt: Date.now() } },
                (err, user) => {
                if (!user) {
                    req.flash('error', 'Password reset token is invalid or has expired.');
                    return res.redirect('back');
                }
                if (req.body.password) {
                        user.password = req.body.password;
                        user.resetPasswordToken = undefined;
                        user.resetPasswordExpires = undefined;

                        user.save((err) => {
                            req.logIn(user, (err) => {
                                done(err, user);
                            });
                        });
                } else {
                    return res.redirect('back');
                }
            });
        },
        (user, done) => {
          const smtpTransport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'deepliam@gmail.com',
                    pass: 'Your password here'
                }
            });
          const mailOptions = {
                to: user.email,
                from: 'deepliam@gmail.com',
                subject: 'Your password has been changed',
                text: 'Hello,\n\n' +
                'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
            };
            smtpTransport.sendMail(mailOptions, (err) => {
                req.flash('success', 'Your password has been changed.');
                done(err);
            });
        }
    ], (err) => {
        res.redirect('/users/profile');
    });
};