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

    connection.end();

});