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
        choices: ["Browse inventory"]
    }).then(function(answer){
        switch (answer.action){
            case "Browse inventory":
                readInventory(department);
                break;
        }
    })
}

function readInventory(department){
    console.log("We're going to the " + department)
}