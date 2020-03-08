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
    storeWelcome();
  });
  
function storeWelcome(){
    inquirer.prompt({
        name: "department",
        type: "list",
        message: "Welcome! What would you like to browse today?",
        choices: ["grocery", "pharmacy", "Exit Bamazon"]
    }).then(function(answer){
        switch (answer.department){
            case "grocery":
            case "pharmacy":
                chooseAction(answer.department);
                break;
            case "Exit Bamazon":
                console.log("Thanks for visiting Bamazon!");
                connection.end();
        }
    });
}

function chooseAction(department){
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: ["Browse inventory", "Purchase an item"]
    }).then(function(answer){
        switch (answer.action){
            case "Browse inventory":
                readInventory(department);
                break;
            case "Purchase an item":
                purchaseItem(department);
                break;
        }
    })
}

function readInventory(department){
    var query = "SELECT * FROM " + department;
      connection.query(query, function(err, res) {
        if (err) throw err;
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
                res[i].stock
            );
          }
        chooseAction(department);
    });
}

//Function for purchasing items, updates stock
function purchaseItem(department){
    inquirer.prompt([{
        name: "id",
        type: "input",
        message: "Select an item by its ID to purchase."
    }, {
        name: "quantity",
        type: "input",
        message: "How many would you like today?"
    }]).then(function(answer){
        //Grab price to display to user how much they have spent.
        //Grab stock to check against requested quantity.
        let itemInfo = "SELECT price,stock FROM " + department + " WHERE ?"
        let price;
        connection.query(itemInfo, { id: answer.id }, function(err, res){
            if (err) throw err;
            //If stock insufficient, inform customer and return to main menu.
            if((res[0].stock - answer.quantity) < 0){
                console.log("I'm sorry, we have insufficient stock to complete your request.")
                storeWelcome();
            } else{
                //Find total for user order
                price = (res[0].price * answer.quantity);
                 //If price contains a decimal that ends after one place, add a "0" in accordance with US currency convention.
                price = price.toFixed(2);
                orderSuccess(department, price, answer.id, answer.quantity)
            }
        });
    });
    
}

function orderSuccess(department, total, itemID, Quantity){
    let query = "UPDATE " + department +  " SET stock=stock-" + Quantity + " WHERE ?"
    connection.query(query, {id: itemID}, function(err, res){
        if (err) throw err;
        console.log("Payment received in the amount of $" + total + "!")
        console.log("Thank you for your purchase!")
        storeWelcome();
    });
}