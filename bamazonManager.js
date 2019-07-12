// pull in required dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Jaimatadi1",
    database: "bamazon_db"
});
// dispaly all items available
connection.connect(function (err) {
    if (err) throw err;
    //show connectivity of SQL and Node.js
    console.log("connected as id " + connection.threadId + "\n");
    //query for all items available
    start();
});


// connection.end();

// list of options. Switch case to trigger event as per option picked

function start() {
    inquirer.
        prompt([
            {
                type: "list",
                name: "option",
                message: "What would you like to do from option choices?",
                choices: [
                    "a: View Products for Sale",
                    "b: View Low Inventory",
                    "c: Add to Inventory",
                    "d: Add New Product",
                    "e: Exit"
                ]
            }])
        .then(function (choices) {
            switch (choices.option) {
                case "a: View Products for Sale":
                    viewProductsForSale();
                    break;
                case "View Low Inventory":
                    viewLowInventory();
                    break;
                case "Add to Inventory":
                    addToInventory();
                    break;
                case "Add New Product":
                    addNewProduct();
                    break;
                case "Exit":
                    exit();
                    break;
            }

        });
}
//function to list every available item: the item IDs, names, prices, and quantities.
function viewProductsForSale() {
    console.log("View products for sale");
    connection.query("select * from products",
        function (err, res) {
            if (err) throw err;
            console.log("Items available for sale.")
            console.table(res);
            // start();
        })

}
