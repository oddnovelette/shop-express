'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    price: {type: Number, required: true},
    currency: {type: String, required: true},
    image_groups: [{
        images: [{
            alt: String,
            link: String,
            title: String
        }],
        view_type: String
    }],
    short_description: {type: String, required: true},
    long_description: {type: String, required: true}
});

let Product;
if (mongoose.models.Product) {
    Product = mongoose.model('Product');
} else {
    Product = mongoose.model('Product', productSchema);
}
module.exports = Product;