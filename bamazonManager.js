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
    // console.log("connected as id " + connection.threadId + "\n");
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
                case "b: View Low Inventory":
                    viewLowInventory();
                    break;
                case "c: Add to Inventory":
                    addToInventory();
                    break;
                case "d: Add New Product":
                    addNewProduct();
                    break;
                case "e: Exit":
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
            start();
        })

}

function viewLowInventory() {
    console.log("List of products having stock quantity less than five.")
    connection.query("SELECT * FROM products WHERE stock_quantity<6", function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    })
}
// function to update product quantity
function addToInventory() {
    console.log(" five.")
    connection.query("SELECT item_id ,product_name, stock_quantity FROM products", function (err, res) {
        if (err) throw err;
        console.table(res);

        // product and item selection
        inquirer.prompt([{
            name: "product",
            type: "input",
            message: "Please select the product to increase the current quantity: ",
        },
        {
            name: "quantity",
            type: "input",
            message: "Please select quantity of product to be updated : ",
            validate: function (value) {
                if (isNaN(value) == false) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }]).then(function (answer) {
            var productChoosenName = answer.product;
            var query = `select stock_quantity from products where product_name ='${productChoosenName}'`
            console.log(query)
            connection.query(
                query,

                function (err, res) {
                    if (err) console.log(err);
                    console.log(res)
                    var newQuantity = res[0].stock_quantity + parseInt(answer.quantity);
                    console.table("New updated quantity for " + productChoosenName + " is :" + newQuantity)
                    connection.query("UPDATE products SET stock_quantity=? WHERE product_name=?",
                        [

                            newQuantity, productChoosenName
                        ], function (err, res) {
                            if (err) throw err;
                        })
                    connection.query("SELECT * FROM products where product_name=?",
                        [productChoosenName],
                        function (err, res) {
                            if (err) throw err;
                            console.table(res);
                            start();
                        })
                })

        });


    })

}

// function to add new product 
// function addNewProduct() {
//     inquirer.prompt([{
//         type: "input",
//         name: "product_name",
//         message: "Enter the name of product to add??"
//     },
//     {
//         type: "input",
//         name: "department_name",
//         message: "Enter the department of product to add??"
//     },
//     {
//         type: "input",
//         name: "price",
//         message: "Enter the price of product to add??",
//         validate: function (value) {
//             if (isNaN(value) == false) {
//                 return true;
//             }
//             else {
//                 return false;
//             }
//         }
//     },
//     {
//         type: "input",
//         name: "stock_quantity",
//         message: "Enter the quantity of product to add??",
//         validate: function (value) {
//             if (isNaN(value) == false) {
//                 return true;
//             }
//             else {
//                 return false;
//             }
//         }

//     }])
//         .then(function (answers) {
//             console.log(answers)
//             var newItem = answers.product_name;
//             var newDept = answers.department_name;
//             var newPrice = answers.price;
//             var newQuantity = answers.stock_quantity;

//             connection.query("INSERT INTO products SET ?",
//                 [{
//                     product_name: newItem
//                 }, {
//                     departement_name: newDept
//                 }, {
//                     price: newPrice
//                 }, {
//                     stock_quantity: newQuantity
//                 }
//                 ]), function (err, res) {
//                     if (err) throw err;
//                     console.log(res.affectedRows + "products inserted! \n");
//                 }

//         })
// }
