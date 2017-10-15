'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt= require('bcrypt-nodejs');

const userSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true}
});

userSchema.methods.encryptUserPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
};

userSchema.methods.validateUserPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);