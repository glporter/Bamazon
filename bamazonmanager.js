//	Create a new Node application called bamazonManager.js. Running this application will:
//	List a set of menu options:
//	-   View Products for Sale
//	-   View Low Inventory
//	-   Add to Inventory
//	-   Add New Product
//
//	If a manager selects View Products for Sale, the app should list every available item: the item IDs, 
//       names, prices, and quantities.
//	If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
//	If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" 
//       of any item currently in the store.
//	If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.
________________________________________



var qtyToPurchase = 5;
var qtyInStock = 0;
var quitFlag = false;


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


connection.connect(function(err) {
    if (err) throw err;

    console.log('Database connected.');


    //updateProduct();

    //createProduct();

    //deleteProduct();

    //displayProducts();
    //checkProductQty(1);
    //console.log("Qty In Stock from selectProductQty call: " + aQtyInStock);
    //updateProductQty(6);



});




function checkProductQty(anItem_id, qtyToPurchase) {
    console.log('select Product Qty for Item Id: ' + anItem_id);
    var qtyInStock = 0;
    var tempQtyLeft = 0;
    var sql = "SELECT * FROM ProductsTable WHERE item_id = " + anItem_id;
    console.log("SQL: " + sql);
    connection.query(sql, function(err, result) {
        if (err) {
            console.log("Error occurred: " + err);
            throw err;
        } else {
            //qtyInStock = result[0].stock_quantity;
            console.log("selectProductQty function -> Quantity in Stock: " + result[0].stock_quantity);
            qtyInStock = result[0].stock_quantity;

            //qtyInStock = selectProductQty(anItem_id);
            console.log("qtyInStock returned from call: " + qtyInStock);
            console.log("qtyToPurchase: " + qtyToPurchase);
            if (qtyInStock > qtyToPurchase) {
                tempQtyLeft = qtyInStock - qtyToPurchase;
                console.log("Remaining quantity: " + tempQtyLeft);
                //tempQtyLeft = 35;
                // fulfillOrder -> which will update the stock quantity for the item_id to tempQtyLeft      
                var sql = "UPDATE ProductsTable SET stock_quantity = " + tempQtyLeft + " WHERE item_id = " + anItem_id;
                console.log("SQL: " + sql);
                connection.query(sql, function(err, result) {
                    if (err) throw err;
                    console.log(result.affectedRows + " record(s) updated");

                });
            } //qtyInStock > qtyToPurchase
            else {
                console.log("Insufficient Quantity");
            } //insufficient quantity


        }
    });

    //displayProducts();
} //end function



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









// ========================================================================
// Load the NPM Package inquirer
var inquirer = require("inquirer");

// Created a series of questions
inquirer.prompt([

    {
        type: "list",
        name: "options",
        message: "What task would you like to perform?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }

]).then(function(inquirerResponse) {

    // If manager wishes to View Products for Sale
    if (inquirer.inquirerResponse === "View Products for Sale") {
        //Execute View Products for Sale logic    
        displayProducts()
    }
    // If manager wishes to View Low Inventory
    else
    if (inquirer.inquirerResponse === "View Low Inventory") {
        //Execute View Log Inventory
    }
    // If manager wishes to Add to Inventory
    else
    if (inquirer.inquirerResponse === "Add to Inventory") {
        //Execute Add to Inventory Logic
    }
    // If manager wishes to Add New Product
    else
    if (inquirer.inquirerResponse === "Add to Product") {
        //Execute View Log Inventory
    }
});