const inquirer = require('inquirer');
const db= require('./db');
require("console.table");
init();
function init(){
    callMainPrompts();
}
function callMainPrompts(){
    inquirer
    .prompt([
        {
        type: "list",
        name: "name",
        message: "What would you like to do?",
        choices: [
        {
        name: "view all departments",
        value: "VIEW_ALL_DEPARTMENTS",
        },{
        name: "view all roles",
        value: "VIEW_ALL_ROLES",
        },{ 
        name: "View all Employees",
        value: "VIEW_ALL_EMPLOYEES",
        },{
        name: "add a department",
        value: "ADD_A_DEPARTMENT"
        },{ 
        name: "add a role",
        value: "ADD_A_ROLE",
        },{
        name: "add an employee",
        value: "ADD_AN_EMPLOYEE",
        },{
        name: "update an employee role",
        value: "Update_AN_Employee_Role",
        }
    ]
        }
    
    ])
    .then((answers) => {
        let name= answers.name;
        switch (name){
            case "VIEW_ALL_DEPARTMENTS":  
                viewDepartments();
                break;
            case "":
            default: 
                quit(); 
        }
      // Use user feedback for... whatever!!
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    }); 
}

function viewDepartments() {
    db.findAllDepartments()
        .then(([rows]) => {
            let departments = rows;
            console.table(departments);
        })
        .then(() => callMainPrompts());
}