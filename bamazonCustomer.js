// Working on finishing the project
//   Will get the product id
//   Get quantity
//   check qty of productid
//   
//   if (productidQty > qtyToPurchase)  {
//     tempQtyLeft = productidQty - qtyToPurchase;
//     fulfillOrder -> which will update the stock quantity for the item_id to tempQtyLeft
//    }
//            else {
//      console.log("Insufficient Quantity")
//   }
// Load the NPM Package inquirer
var inquirer = require("inquirer");

var Table = require('cli-table');

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "glpMySQL2017",
    database: "bamazon"
});

var productId = 0;
var qtyToPurchase = 0;
var qtyInStock = 0;
var quitFlag = false;

connection.connect(function(err) {
    if (err) throw err;

    console.log('Database connected.');

    //updateProduct();

    //createProduct();

    //deleteProduct();

    displayProducts();

});


// Function to create new product row
function createProduct() {
    console.log('Creating a new item....');

    // INSERT INTO products SET flavor='Peach', price=3.0, quantity=50

    connection.query(
        'INSERT INTO products SET ?', {
            flavor: 'Some Flavor',
            price: 5.0,
            quantity: 100
        },
        function(err, result) {
            if (err) throw err;

            console.log(result);

        }
    );

}

// Function to update product row

function updateProduct() {
    console.log('Updating all Rocky Road quantities...\n');

    //UPDATE products SET quantity=100 WHERE flavor='Rocky Road'

    connection.query(
        'UPDATE products SET ? WHERE id > 4', [
            { quantity: 20000 } // '?' #1
        ],
        function(err, result) {
            if (err) throw err;

            console.log(result);

        }
    );

}


function deleteProduct() {
    console.log('Deleting all strawberry ice cream...\n');

    // DELETE FROM products WHERE flavor='strawberry';

    connection.query(
        'DELETE FROM products WHERE ?', {
            flavor: 'strawberry'
        },
        function(err, result) {
            if (err) throw err;

            console.log(result.affectedRows + ' products deleted!');
            connection.end();

        }
    )

}


function selectProductQty(anItem_id) {
    console.log('select Product Qty for Item Id: ' + anItem_id);

    connection.query(
        //  'SELECT stock_quantity FROM ProductsTable WHERE item_id = ?', {
        //      item_id: anItem_id
        //  },
        'SELECT stock_quantity FROM ProductsTable WHERE item_id = ' + anItem_id, {
            //item_id: anItem_id
        },
        function(err, result) {
            if (err) throw err;

            console.log(result.affectedRows + ' record returned!');
            connection.end();

        }
    )

}



function displayProducts() {
    connection.query('SELECT * FROM ProductsTable', function(err, res) {
        if (err) throw err;

        var table = new Table({
            head: ['ITEM ID', 'PRODUCT', 'DEPARTMENT', 'PRICE', 'STOCK']

        })

        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
        }


        console.log(table.toString());

        connection.end();

    })
}

//selectProductQty(6);