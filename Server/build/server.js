"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var productDatabase = {
    'apples': { 'title': 'Tasty Apples', 'price': 2.19 },
    'oranges': { 'title': 'Delicious Oranges', 'price': 2.88 },
    'grapes': { 'title': 'Grapes. Just grapes.', 'price': 1.69 }
};
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/products', function (req, res) {
    console.log("Request for poduct database.");
    res.send(JSON.stringify(productDatabase));
});
app.post('/total', function (req, res) {
    var cart = req.body;
    var total = getTotal(cart);
    console.log("Sending: " + total);
    res.send("" + total);
});
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("App listening at http://%s:%s", host, port);
});
function getTotal(cart) {
    console.log("Get Total: " + cart);
    var total = 0;
    for (var _i = 0, cart_1 = cart; _i < cart_1.length; _i++) {
        var item = cart_1[_i];
        total += getPrice(item);
    }
    return total;
}
function getPrice(item) {
    console.log("GetPrice: " + item);
    return productDatabase[item]['price'];
}
//# sourceMappingURL=server.js.map