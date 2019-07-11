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
    connection.query("SELECT * FROM products", function (err, response) {
        if (err) throw err;
        console.table(response)
        questionToBeAsked();
    })

    // connection.end();

});

var questionToBeAsked = function () {
    // prompt the user with a meaaage
    inquirer.prompt([{
        name: "id",
        type: "input",
        message: "The first should ask them the ID of the product they would like to buy.",
        validate: function (value) {
            if (isNaN(value) == false) {
                return true;
            }
            else {
                return false;
            }
        }
    },
    {
        name: "quantity",
        type: "input",
        message: "The second message should ask how many units of the product they would like to buy.",
        validate: function (value) {
            if (isNaN(value) == false) {
                return true;
            }
            else {
                return false;
            }
        }
    }]).then(function (answers) {
        // setting user input to currentItem and currentQuality
        var currentItem = answers.id;
        var currentQuantity = answers.quantity;

        // compare avaialble items and prompt msg if not available
        connection.query("SELECT * FROM products where item_id=?",
            [currentItem]
            , function (err, response) {
                if (err) throw err;
                console.table(response)
                matchQuantity(currentItem, currentQuantity);

            })
    })

}
function matchQuantity(id, currentQuantity) {

    connection.query("select * from products where item_id =?", [id], function (err, res) {
        console.log("Available stock for your order : " + res[0].stock_quantity);

        var availableStock;
        var totalCost;

        if (res[0].stock_quantity >= currentQuantity) {
            availableStock = (res[0].stock_quantity - currentQuantity);
            totalCost = res[0].price * currentQuantity;
            console.log(" Item available after placing order is " + availableStock)
            connection.query("UPDATE products SET ? where ?",
                [{ stock_quantity: availableStock },
                { item_id: id }]
                , function (err, response) {
                    if (err) throw err;
                    console.table(response)

                })
            console.log("Your item is available. Total cost for this transaction is $ " + totalCost);
        } else {
            console.log("Your order exceed current stock. Please choose another item quantity.");
            questionToBeAsked();

        }
    })


}