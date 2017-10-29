'use strict';

/**
 * Module for wishlist
 *
 * @module Wishlist
 * @param {Object} existingWishlist
 * @return {Array} arr
 */
module.exports = function Wishlist(existingWishlist) {
    this.items = existingWishlist.items || {};
    this.totalQty = existingWishlist.totalQty || 0;

    this.add = function(item, id) {
        let storedItem = this.items[id];
        if (!storedItem) {
            storedItem = this.items[id] = {item: item, qty: 0, price: 0};
        }
        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalQty++;
    };

    this.generateArray = function() {
        let arr = [];
        for (let id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
};