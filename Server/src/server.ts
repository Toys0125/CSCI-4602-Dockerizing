import express = require('express');
import bodyParser = require('body-parser');

// Let's pretend that this is our product database.
let productDatabase = {
    'apples': { 'title': 'Tasty Apples', 'price': 2.19 },
    'oranges': { 'title': 'Delicious Oranges', 'price': 2.88 },
    'grapes': { 'title': 'Grapes. Just grapes.', 'price': 1.69 },
    'banna': { 'title': 'Banna are full of K', 'price': 1.12 }
}

let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// This gets the product database!
app.get('/products', function (req, res) {
    console.log("Request for poduct database.");
    res.send(JSON.stringify(productDatabase));
})

// This will return the total from a list of products.
app.post('/total', function (req, res) {
    let cart = req.body;

    let total = getTotal(cart);
    console.log("Sending: " + total);
    res.send(`${total}`);
})

app.post('/taxes', function (req,res){
    let cart = req.body;

    let taxes = getTaxes(cart);
    console.log("Sending Taxes: " + taxes);
    res.send(`${taxes}`)
})

// This starts our server.
var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("App listening at http://%s:%s", host, port)
})

// This computes the total.
function getTotal(cart): number {
    console.log("Get Total: " + cart);
    let total = 0;
    for (let item of cart) {
        total += getPrice(item);
    }
    return total;
}

function getTaxes(cart):number {
    console.log("Get Taxes: " + cart);
    let taxes = 0;
    for (let item of cart){
        taxes += getPrice(item)*0.095;
    }
    return Math.round(taxes*100)/100;
}

// This gets the price of one item.
function getPrice(item): number {
    console.log("GetPrice: " + item);
    return productDatabase[item]['price'];
}