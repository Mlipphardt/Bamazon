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
        choices: ["grocery", "pharmacy", "Which sells the most stock?"]
    }).then(function(answer){
        switch (answer.department){
            case "grocery":
            case "pharmacy":
                chooseAction(answer.department);
                break;
        }
        if(answer.department == "Which sells the most stock?"){
            console.log("This feature is under construction!")
            storeWelcome();
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
        let itemInfo = "SELECT price FROM " + department + " WHERE ?"
        let price;
        connection.query(itemInfo, { id: answer.id }, function(err, res){
            if (err) throw err;
            console.log(res)
            price = res[0].price.toString();
            console.log(price);
            console.log(price.length);
            if(price.length == 3){
                price = price + "0";
                console.log(price);
            }
            chooseAction(department);
        });
        let query = "UPDATE " + department +  " SET stock=stock-1 WHERE ?"
        connection.query(query, {id: answer.id}, function(err, res){
            if (err) throw err;
            console.log(res)
            console.log("Payment received in the amount of $" + price + "!")
            console.log("Thank you for your purchase!")
        });
    });
    
}