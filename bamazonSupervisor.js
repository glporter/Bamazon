//	Create a new Node application called bamazonManager.js. Running this application will:
// This application will list a set of menu options:
// -	View Product Sales by Department
//- 	Create New Department
//  When a supervisor selects View Product Sales by Department, the app should display 
// a summarized table in their terminal/bash window

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


function viewProductSalesbyDept() {

    var sql = "Select departmentstable.department_id, departmentstable.department_name, " +
        "productstable.product_sales - departmentstable.over_head_costs as " +
        "'total_profit'" + ", departmentstable.over_head_costs " +
        "from bamazon.departmentstable LEFT JOIN bamazon.productstable on bamazon.departmentstable.department_id = bamazon.productstable.department_id" +
        " group by department_id;";


    connection.query(sql, function(err, res) {
        if (err) throw err;

        // var table = new Table({
        //     head: ['DEPARTMENT ID', 'DEPARTMENT NAME', 'TOTAL PROFIT', 'OVER HEAD COSTS']

        // })

        //for (var i = 0; i < res.length; i++) {
        //     table.push([res[i].department_id, res[i].department_name, res[i].total_profit, res[i].over_head_costs]);
        // }

        //console.log("Result set: " + res);
        //console.log("Result length: " + res.length);
        console.log("\n\n\n" + "DEPARTMENT ID                  DEPARTMENT NAME                  TOTAL PROFIT          OVER-HEAD-COSTS");
        console.log("-----------                    ---------------                  ------------          ---------------");
        for (var i = 0; i < res.length; i++) {
            console.log("\t" + res[i].department_id + "\t\t\t" + res[i].department_name + "\t\t\t" + res[i].total_profit + "\t\t\t" + res[i].over_head_costs);
        }

        //console.log(table.toString());

        //connection.end();

    })
} //end function viewProductSalesbyDept()


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

function createNewDepartment(aDepartmentName, anOverheadAmt) {

    var sql = "INSERT INTO departmentstable (department_name, over_head_costs)" +
        " VALUES('" + aDepartmentName + "','" + anOverheadAmt + "')";
    connection.query(sql, function(err, result) {
        if (err) {
            console.log("Error: " + err);
            throw err;
        } else {
            console.log(result.affectedRows + " record(s) updated");
        }

    });

} //end createNewDepartment




// Created a series of questions
inquirer
    .prompt([
        // Prompt user for id of new product to add
        {
            type: "list",
            name: "options",
            message: "Indicate the department for this new product ",
            choices: ["View Product Sales by Department", "Create New Department"]
        }
    ])
    .then(function(inquirerResponse) {
        // 
        if (inquirerResponse.options === "View Product Sales by Department") {
            viewProductSalesbyDept();
        } //end View Product Sales by Department
        else {
            if (inquirerResponse.options === "Create New Department") {
                // Create a "Prompt" with a series of questions.
                //viewProductSalesbyDept();
                inquirer
                    .prompt([
                        // Prompt user for id of product to purchase
                        {
                            type: "input",
                            message: "Enter new Department Name?",
                            name: "departmentName"
                        },

                        // Prompt user for quantity of product to purchase
                        {
                            type: "input",
                            message: "Enter department over-head-costs?",
                            name: "overheadcosts"
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
                            console.log("\n\nNew Department Name entered: " + inquirerResponse.departmentName);
                            console.log("\n\nNew Department Overhead Costs: " + inquirerResponse.overheadcosts);
                            createNewDepartment(inquirerResponse.departmentName, parseFloat(inquirerResponse.overheadcosts));
                            viewProductSalesbyDept();
                        } else {
                            console.log("\nThat's okay, come again when you are more sure.\n");
                        }
                    });

            }
        } //end Create New Department
    });