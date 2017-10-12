var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    short_descrption: {type: String, required: true},
    price: {type: Number, required: true},
    currency: {type: String, required: true}
});

module.exports = mongoose.model('Product', productSchema);