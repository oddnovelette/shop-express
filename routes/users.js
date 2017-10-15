const express = require('express');
const router = express.Router();

const csurf = require('csurf');
const passport = require('passport');
const csrf = csurf();
router.use(csrf);

