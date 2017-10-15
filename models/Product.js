const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    short_descrption: {type: String, required: true},
    price: {type: Number, required: true},
    currency: {type: String, required: true}
});

module.exports = mongoose.model('Product', productSchema);