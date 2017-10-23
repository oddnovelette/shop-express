'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    _id: {type: String, required: true},
    categories: [{
        categories: [{
            id: {type: String, required: true},
            image: {type: String},
            name: {type: String, required: true},
            page_descripton: {type: String, required: true},
            page_title: {type: String, required: true},
            parent_category_id: {type: String, required: true},
        }],

        id: {type: String, required: true},
        image: {type: String},
        name: {type: String, required: true},
        page_title: {type: String, required: true},
        page_description: {type: String, required: true},
        parent_category_id: {type: String, required: true},
    }],

    name: {type: String, required: true},
    page_title: {type: String, required: true},
    page_description: {type: String, required: true},
});

module.exports = mongoose.model('Category', categorySchema);