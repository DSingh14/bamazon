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

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    promptUser();
    connection.end();

});


var promptUser = function () {

    // Prompt the user with a message
    inquirer.prompt([{
        name: "Item_ID",
        message: "Enter the ID of the item you wish to purchase.",

        // Make sure that they typed in a number and not a letter
        validate: function (value) {
            if (isNaN(value) == false) {
                return true;
            }
            else {
                return false;
            }
        }
    }, {

        // After the first prompt, do another
        name: "userQuantity",
        message: "How many would you like to buy?",

        // And validate they typed in a number
        validate: function (value) {
            if (isNaN(value) == false) {
                return true;
            }
            else {
                return false;
            }
        }
        // After the series of prompts
    }]).then(function (answers) {

        // Set the userinput to currentItem and currentAmount
        var currentItem = answers.Item_ID;
        var currentAmount = answers.userQuantity;

        //Read from database. If they requested too much, don't perform the transaction.
        //Otherwise fulfuill the request.
        connection.query('SELECT * FROM products WHERE ?', {
            Item_ID: answers.Item_ID
        }, function (err, res) {

            //If the amount requested is greater than the amount in stock.
            if (currentAmount > res[0].Stock_Quantity) {
                console.log("You cannot buy that many!");

                // Back to prompt
                promptUser();
            }
            // Otherwise they may buy it
            else {
                console.log("You can buy it!");

                // Calculate the new quantity to update in the database
                var newQuantity = (res[0].Stock_Quantity - currentAmount);
                var totalCost = res[0].Price * currentAmount;

                // Update the quantity
                connection.query('UPDATE products SET ? WHERE ?', [{
                    Stock_Quantity: newQuantity
                }, {
                    Item_ID: currentItem
                }], function (err, res) {
                    console.log("You were charged $" + totalCost);

                    // Back to the prompt
                    promptUser();
                });
            }
        })
    })
} 