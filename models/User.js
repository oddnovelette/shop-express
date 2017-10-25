'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt= require('bcrypt-nodejs');

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    token: {type: String},
});

userSchema.methods.encryptUserPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
};

userSchema.methods.validateUserPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

let User;
if (mongoose.models.User) {
    User = mongoose.model('User');
} else {
    User = mongoose.model('User', userSchema);
}
module.exports = User;