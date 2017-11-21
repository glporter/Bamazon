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
// Load the NPM Package 

//var qtyToPurchase = 5;
var qtyInStock = 0;
var quitFlag = false;
var newStockQty = 0;


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
} //end displayProducts


function displayLowInventory() {

    connection.query('SELECT * FROM ProductsTable WHERE stock_quantity < 60', function(err, res) {
        if (err) throw err;

        var table = new Table({
            head: ['ITEM ID', 'PRODUCT', 'DEPARTMENT', 'PRICE', 'STOCK']

        })

        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
        }


        console.log(table.toString());

        //connection.end();

    })
} //end function displayLowInventory()


function updateInventoryQty(anItem_id, aQuantity) {
    // get current stock_quantity
    var sql = "SELECT * FROM ProductsTable WHERE item_id = " + anItem_id;
    console.log("SQL: " + sql);
    connection.query(sql, function(err, result) {
        if (err) {
            throw err;
            console.log(result.affectedRows + " record(s) updated");
        } else {
            newStockQty = parseInt(result[0].stock_quantity) + aQuantity;
            console.log("New Stock Quantity: " + newStockQty);

            var sql = "UPDATE ProductsTable SET stock_quantity = " + newStockQty + " WHERE item_id = " + anItem_id;
            console.log("SQL: " + sql);
            connection.query(sql, function(err, result) {
                if (err) {
                    throw err;
                } else { //qtyInStock > qtyToPurchase
                    console.log(result.affectedRows + " record(s) updated");
                }

            });

        }
    });
} //end function addToInventory()


function insertNewProduct(aProduct, aPrice, aDepartment, aQuantity) {

    var sql = "INSERT INTO ProductsTable (product_name, price, department_name, stock_quantity)" +
        " VALUES('" + aProduct + "','" + aPrice + "','" + aDepartment + "','" + aQuantity + "')";
    connection.query(sql, function(err, result) {
        if (err) {
            console.log("Error: " + err);
            throw err;
        } else {
            console.log(result.affectedRows + " record(s) updated");
        }

    });

} //end insertNewProduct




// Created a series of questions
inquirer.prompt([{
        type: "list",
        name: "options",
        message: "What task would you like to perform?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }

]).then(function(inquirerResponse) {
    console.log(inquirerResponse);
    // If manager wishes to View Products for Sale
    if (inquirerResponse.options === "View Products for Sale") {
        //Execute View Products for Sale logic    
        displayProducts();
    }
    // If manager wishes to View Low Inventory
    else
    if (inquirerResponse.options === "View Low Inventory") {
        //Execute View Log Inventory
        displayLowInventory();
    }
    // If manager wishes to Add to Inventory
    else
    if (inquirerResponse.options === "Add to Inventory") {
        //Execute Add to Inventory Logic
        // Create a "Prompt" with a series of questions.
        inquirer
            .prompt([
                // Prompt user for id of product to update
                {
                    type: "input",
                    message: "Product ID ",
                    name: "productId"
                },

                // Prompt user for quantity of product to update
                {
                    type: "input",
                    message: "Quantity to Add?",
                    name: "productQty"
                },
                // Here we ask the user to confirm.
                {
                    type: "confirm",
                    message: "Are you sure:",
                    name: "confirm",
                    default: true
                }
            ])
            .then(function(inquirerResponse) {
                // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
                if (inquirerResponse.confirm) {
                    console.log("\nProduct Id entered: " + inquirerResponse.productId);
                    console.log("\nProduct Quantity to Add: " + inquirerResponse.productQty);
                    updateInventoryQty(inquirerResponse.productId, parseInt(inquirerResponse.productQty));
                    displayProducts();
                } else {
                    console.log("\nThat's okay, come again when you are more sure.\n");
                }
                return;
            });
    }
    // If manager wishes to Add New Product
    else
    if (inquirerResponse.options === "Add New Product") {
        inquirer
            .prompt([
                // Prompt user for id of new product to add
                {
                    type: "input",
                    message: "Enter Product Name?",
                    name: "productName"
                },
                // Prompt user for price of new product to add
                {
                    type: "input",
                    message: "Enter Product Price?",
                    name: "price"
                },

                // Prompt user for quantity of product to purchase
                {
                    type: "input",
                    message: "Enter Quantity?",
                    name: "productQty"
                },
                {
                    type: "list",
                    name: "options",
                    message: "Indicate the department for this new product ",
                    choices: ["Electronics", "Home", "Garden", "Furniture", "Automotive", "Bed and Bath"]
                }
            ])
            .then(function(inquirerResponse) {
                // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
                console.log("\nNew Product Name: " + inquirerResponse.productName);
                console.log("\nNew Product Price: " + inquirerResponse.price);
                console.log("\nProduct Quantity to Add: " + inquirerResponse.productQty);
                console.log("\nDepartment: " + inquirerResponse.options);
                insertNewProduct(inquirerResponse.productName, parseFloat(inquirerResponse.price), inquirerResponse.options, parseInt(inquirerResponse.productQty));
                displayProducts();
                return;
            });
    }
});