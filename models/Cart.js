'use strict';

/**
 * Module for shopping cart basic functionality
 *
 * @module Cart
 * @param {Object} existingCart
 * @return {Array} arr
 */
module.exports = function Cart(existingCart) {
    this.items = existingCart.items || {};
    this.totalQty = existingCart.totalQty || 0;
    this.totalPrice = existingCart.totalPrice || 0;

    this.add = function(item, id) {
        let storedItem = this.items[id];
        if (!storedItem) {
            storedItem = this.items[id] = {item: item, qty: 0, price: 0};
        }
        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalQty++;
        this.totalPrice += storedItem.item.price;
    };

    this.generateArray = function() {
        let arr = [];
        for (let id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
};