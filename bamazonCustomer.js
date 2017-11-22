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
// Load the NPM Package inquirervar productId = 0;

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
    var itemPrice = 0;
    var productSales = 0;
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
            itemPrice = parseFloat(result[0].price);
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
                    else {
                        console.log(result.affectedRows + " record(s) updated");
                        productSales = itemPrice * qtyToPurchase;
                        updateProductSales(anItem_id, productSales);
                    }
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

        //connection.end();

    })
}


//When a customer purchases anything from the store, the price of the product multiplied by the quantity 
//purchased is added to the product's product_sales column.
function updateProductSales(anItem_id, productSales) {

    var sql = "UPDATE ProductsTable SET product_sales = " + productSales + " WHERE item_id = " + anItem_id;
    console.log("UPDATE ProductsTable.product_sales SQL: " + sql);
    connection.query(sql, function(err, result) {
        if (err) {
            throw err;
        } else { //qtyInStock > qtyToPurchase
            console.log(result.affectedRows + " record(s) updated");
            connection.close();
        }

    });
}


// Load the NPM Package inquirer
var inquirer = require("inquirer");

// Create a "Prompt" with a series of questions.
inquirer
    .prompt([
        // Prompt user for id of product to purchase
        {
            type: "input",
            message: "Product ID to purchase?",
            name: "productId"
        },

        // Prompt user for quantity of product to purchase
        {
            type: "input",
            message: "Quantity to buy?",
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
            console.log("\nProduct Quantity to purchase: " + inquirerResponse.productQty);
            checkProductQty(inquirerResponse.productId, inquirerResponse.productQty)
            displayProducts();
        } else {
            console.log("\nThat's okay, come again when you are more sure.\n");
        }
    });