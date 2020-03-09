var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazonDB"
});

connection.connect(function(err) {
    if (err) throw err;
    managerMenu();
  });

function verifyUser(){
    inquirer.prompt([{
        name: "username",
        type: "input",
        message: "Please provide your username."
    },
    {
        name: "password",
        type: "input",
        message: "Please enter your password."
    }]).then(function(answer){
        if(answer.username == "MichaelScott" && answer.password == "1234"){
            managerMenu();
       } else {
           console.log("Your username or password is incorrect.")
       }

    })
}

function managerMenu(){
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: ["View inventory", "Restock inventory", "Add new item"]
    }).then(function(answer){
        switch (answer.action){
            case "View inventory":
                viewInventory();
                break;
            case "Restock inventory":
                restockInventory();
                break;
            case "Add new item":
                addItem();
                break;
        }
    });

}

function viewInventory(){
    readInventory("grocery");
    readInventory("apparel");
    readInventory("electronics");
    readInventory("pharmacy");
    managerMenu();
}

function readInventory(department){
    var query = "SELECT * FROM " + department;
      connection.query(query, function(err, res) {
        if (err) throw err;
        console.log(department + "\n--------------------")
        for (var i = 0; i < res.length; i++) {
            console.log(
                "ID: " +
                res[i].id +
                " || Item: " +
                res[i].item +
                " || Price: " +
                res[i].price +
                " || Description: " +
                res[i].description +
                " || Stock " +
                res[i].stock +
                " || Sold " +
                res[i].sold
            );
          };
    });
};

function restockInventory(){
    inquirer.prompt([{
        name: "department",
        type: "list",
        message: "Which department is this request for?",
        choices: ["grocery", "apparel", "electronics", "pharmacy"]
    },
    {
        name: "id",
        type: "input",
        message: "Select item by ID.",
    },
    {
        name: "quantity",
        type: "input",
        message: "How many should be added to the stock?"
    }]).then(function(answer){
        let query = "UPDATE " + answer.department + " SET stock=stock+" + answer.quantity + " WHERE ?"
        connection.query(query, { id: answer.id }, function(err, res){
            if (err) throw err;
            console.log("Stock successfully updated!");
            managerMenu();
         });
    });;
};

function addItem(){
    inquirer.prompt([{
        name: "department",
        type: "list",
        message: "Which department is this request for?",
        choices: ["grocery", "apparel", "electronics", "pharmacy"]
    },
    {
        name:"name",
        type: "input",
        message: "What is the name of the item?"
    },
    {
        name: "price",
        type: "input",
        message: "What will the item's price be?"
    },
    {
        name: "description",
        type: "input",
        message: "Please provide a brief description of the item."
    },
    {
        name: "stock",
        type: "input",
        message: "How much should we stock to begin with?"
    }]).then(function(answer){
        let query = "INSERT INTO " + answer.department + " (item, price, stock, description, sold) "
        query+= "VALUES ('" + answer.name + "', " + answer.price + ", " + answer.stock + ", '" + answer.description + "', 0);"
        connection.query(query, function(err, res){
            if (err) throw err;
            console.log("Item successfully added!");
            managerMenu();
        })
    });

}