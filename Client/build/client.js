"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = void 0;
var fetch = require("sync-fetch");
var readlineSync = require("readline-sync");
var url = "http://localhost:3000";
var ShoppingCart = (function () {
    function ShoppingCart() {
        this.items = [];
    }
    ShoppingCart.prototype.add = function (item) {
        this.items.push(item);
    };
    ShoppingCart.prototype.getItems = function () {
        return this.items;
    };
    return ShoppingCart;
}());
function start() {
    showMainMenu(new ShoppingCart());
}
exports.start = start;
function showMainMenu(sc) {
    while (true) {
        console.log("Welcome to the Grocery System!\n  1. Add a product to the cart.\n  2. Get Total.\n  3. Quit.");
        var response = readlineSync.question('> ');
        if (response === '3' || response.slice(0, 2).toLowerCase() === ':q') {
            break;
        }
        switch (response) {
            case '1':
                addProductToCart(sc);
                break;
            case '2':
                getTotalOfCart(sc);
                break;
            default: console.log('Invalid option!');
        }
        console.log('');
    }
}
function showProducts() {
    var response = fetch(url + "/products");
    var products = response.json();
    console.log("All products.");
    for (var product in products) {
        console.log("-- Select " + product + ": " + products[product]["title"] + " $" + products[product]["price"] + ".");
    }
    console.log("");
}
function addProductToCart(sc) {
    showProducts();
    console.log("Which product would you like to add?");
    var response = readlineSync.question('> ');
    sc.add(response);
}
function getTotalOfCart(sc) {
    var cartStr = JSON.stringify(sc.getItems());
    console.log("Getting Total in Client: " + cartStr);
    var total = fetch(url + "/total", {
        method: 'POST',
        body: cartStr,
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    });
    console.log("Your cart total is $" + total.json() + ".");
}
start();
//# sourceMappingURL=client.js.map