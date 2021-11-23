//Client application for our grocery store.
//@author Marcus Stange

const fetch = require("sync-fetch");
import readlineSync = require('readline-sync');
let url = "http://localhost:3000"

class ShoppingCart {
    items: string[];

    constructor() {
        this.items = [];
    }

    add(item: string) {
        this.items.push(item);
    }

    getItems(): string[] {
        return this.items;
    }
}

/**
 * Function to run the UI
 */
export function start() {
    showMainMenu(new ShoppingCart());
}

/**
 * The main menu. Will show until the user exits
 */
function showMainMenu(sc: ShoppingCart) {
  while(true){ //run until we exit
    console.log(`Welcome to the Grocery System!
  1. Add a product to the cart.
  2. Get Total.
  3. Quit.`);

    let response = readlineSync.question('> ')
    if(response === '3' || response.slice(0,2).toLowerCase() === ':q'){
      break; //stop looping, thus leaving method
    }

    switch(response) { //handle each response
      case '1': addProductToCart(sc); break;
      case '2': getTotalOfCart(sc); break;
      default: console.log('Invalid option!');
    }
    console.log(''); //extra empty line for revisiting
  }
}

function showProducts() {
    const response = fetch(url + "/products");
    const products = response.json();

    console.log("All products.");
    for (let product in products) {
        console.log(`-- Select ${product}: ${products[product]["title"]} $${products[product]["price"]}.`);
    }
    console.log("");
}

function addProductToCart(sc: ShoppingCart) {
    showProducts();
    
    console.log(`Which product would you like to add?`);
    let response = readlineSync.question('> ')
    sc.add(response);
}

function getTotalOfCart(sc: ShoppingCart) {
    let cartStr = JSON.stringify(sc.getItems());
    console.log("Getting Total in Client: "+cartStr);

    const total = fetch(url + "/total", {
        method: 'POST',
        body: cartStr,
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }});

    console.log(`Your cart total is $${total.json()}.`);
}

start();