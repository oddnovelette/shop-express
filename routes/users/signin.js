const express = require('express');
const router = express.Router();
const csurf = require('csurf');
const passport = require('passport');
const csrf = csurf();
router.use(csrf);

router.get('/', (req, res, next) => {
    let messages = req.flash('error');
    res.render('users/signin', {
        csrfToken: req.csrfToken(),
        messages: messages,
        hasErrors: messages.length > 0
    });
});

router.post('/', passport.authenticate('local.signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash: true
}));

module.exports = router;