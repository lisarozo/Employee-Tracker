const mysql = require('mysql2');
const inquirer = require('inquirer');
const db = require('./db');
require("console.table");
const connection = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // {TODO: Add your MySQL password}
      password: 'Themoon01',
      database: 'employees'
    },
    console.log(`Connected to the inventory_db database.`)
  );

  connection.connect(function(err){
      if (err) throw err;
  })

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
        value: "UPDATE_AN_EMPLOYEE_ROLE",
        }
    ]
        }
    
    ])
    .then((answers) => {
        
        let name= answers.name;
        switch (name){
            case "VIEW_ALL_DEPARTMENTS":  
                viewAllDepartments();
                
                break;
            case "VIEW_ALL_ROLES":
                viewAllRoles();
                
                break;
            case "VIEW_ALL_EMPLOYEES":
                viewAllEmployees();
                    
                break;
             case "ADD_A_DEPARTMENT":
                addADepartment();
                    
                break;
            case "ADD_A_ROLE":
                addARole();
                   
                break;
             case "ADD_AN_EMPLOYEE":
                addAnEmployee();
                   
                break;
            case "UPDATE_AN_EMPLOYEE_ROLE":
                updateAnEmployeeRole();
                    
                break;
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

function viewAllDepartments() {
    console.log("INSIDE OF VIEW ALL DEPARTMENTS");
    // db.findAllDepartments()
        // .then(([rows]) => {
        //     let departments = rows;
        //     console.table(departments);
        // })
        // .then(() => callMainPrompts());
        connection.query("select NAME from department", function(err, res){
            if (err) throw err;
            console.log("alldepartments");
            console.table(res);
        }) 
        init();
}
function viewAllRoles() {
//     db.viewAllRoles()
//         .then(([rows]) => {
//             let departments = rows;
//             console.table(departments);
//         })
//         .then(() => callMainPrompts());
connection.query("SELECT role.title, role.id FROM role", function(err, res){
    if (err) throw err;
    console.log("alldepartments");
    console.table(res);
})
init();
}
function viewAllEmployees() {

    // db.viewAllEmployees()
    //     .then(([rows]) => {
    //         let departments = rows;
    //         console.table(departments);
    //     })
    //     .then(() => callMainPrompts());
   connection.query("SELECT employee.first_name, employee.last_name FROM employee", function(err, res){
   if (err) throw err;
    console.log("viewAllEmployees");
    console.table(res);
})
init();
}
function addADepartment() {
    inquirer.prompt([
        {
        type: "input",
        name: "department",
        message: "What is the department you would like to add?"
    }
])
    .then((answers) => {
        connection.query(`INSERT INTO department (name) VALUES ('${answers.department}')`, function(err, res){
            if (err) throw err;
            
             
    })
    init()
     })

}


function addARole() {
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is the title you would like to add?"
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary you would like to add?"
        },
        {
            type: "list",
            name: "role_department",
            message: "What department does the role belong to?",
             choices:roles ["Accounting", "Lawyer", "Engineering", "Human Resources"]
        
        }


])
// .then((answers) => {
//     function searchRoles(roleKey, myArray){
//         for(var i = 0; i < myArray.length; i ++){
//             if(myArray[i].name === roleKey){
//                 return myArray [i];
//             }
//         }
//     }
//     let rolesId = searchRoles(answers.department_id, roles)
//     connection.query(`INSERT INTO role (title, salary, department_id) VALUES ('${answers.title}', '${parseInt(answers.salary)}', '${parseInt(rolesId.department_id)}')`,  function(err, res){
//         if (err) throw err;
//      })
//     })
//     let roles = [];
//     connection.query (`SELECT DISTINCT department.id as department_id, name FROM role
//     RIGHT JOIN department on role.department_id = department.id;`,(err,response) => {
//         response.forEach((role) => {
//             roles.push({
//                 "department_id": role.department_id,
//                 "name": role.name
//             })
//         })
    // })
     
}





function addAnEmployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "What is the first_name of the employee you would like to add?"
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the last_name of the employee you would like to add?"
        },
        {
            type: "list",
            name: "role_id",
            message: "What department does the role belong to?"
        },
        {
            type: "list",
            name: "manager_id",
            message: "What department does the manager belong to?"
        },
    ]) 
    // connection.query("INSERT INTO employee SET", function(err, res){
    //     if (err) throw err;
    //      console.log("addAnEmployee");
    //      console.table(res);
//      })
   
}
function updateAnEmployeeRole() {

    connection.query("UPDATE employee SET role_id = ", function(err, res){
        if (err) throw err;
         console.log("alldepartments");
         console.table(res);
     })
     init();
}
function quit(){
    process.exit();
}