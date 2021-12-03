const mysql = require('mysql2');
const inquirer = require('inquirer');
const connection = require('./db/connection');
require("console.table");



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
                getDepartment();
                   
                break;
             case "ADD_AN_EMPLOYEE":
                getRoleId();
                   
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
    connection.query("SELECT * FROM department",(err, res) =>{
        if(err) throw err;
        console.table(res);
        callMainPrompts();
    })
        
       
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
   connection.query("SELECT employee.first_name, employee.last_name, employee.role_id FROM employee", function(err, res){
   if (err) throw err;
    console.log("viewAllEmployees");
    console.table(res);
})
callMainPrompts();
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
    callMainPrompts()
     })

}

function addARole(deptId, deptName) {
    let id = ""
    
    inquirer.prompt([
    
        {
            type: "input",
            name: "role",
            message: "Which role would you like to add?",
             
        
        },
        {
            type: "input",
            name: "salary",
            message: "What salary does this role have?",
             
        
        },
        {
            type: "list",
            name: "department_id",
            message: "Which department does this role belong to?",
            choices:deptName
        
        },
])
.then((answers) => {
    for (let i = 0; i < deptId.length; i++) {
        if (answers.department_id === deptName[i]) {
            id += deptId[i]
        }
    };
    let query = 
    'INSERT INTO role(title, salary, department_id)' +
    'VALUES(?, ?, ?)';
    connection.query(query,[answers.role, answers.salary, parseInt(id)],(err, res) => {
        if (err) throw err;
        callMainPrompts()
    })
       
              
    })
    
    
    
}

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
     





function addAnEmployee(roleId, roleName) {
   let id = ""
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
            message: "What department does the role belong to?",
            choices: roleName
        },
        
    ]) 
   .then((answers) => {
    for (let i = 0; i < roleId.length; i++) {
        if (answers.role_id === roleName[i]) {
            id += roleId[i]
        }
    };
    let query = 
    'INSERT INTO employee (first_name, last_name, role_id)' +
    'VALUES(?, ?, ?)';
    connection.query(query,[answers.first_name, answers.last_name, parseInt(id)],(err, res) => {
        if (err) throw err;
        callMainPrompts()
    })
       
              
    })
    
    
    
}




   

function updateAnEmployeeRole() {

    connection.query("UPDATE employee SET role_id = ", function(err, res){
        if (err) throw err;
         console.log("alldepartments");
         console.table(res);
     })
     callMainPrompts();
}
function getDepartment(){
    let deptId = []
    let deptName = []
    connection.query("SELECT * FROM department",(error, res) =>{
        if(error) throw error
        res.forEach(({ id }) => {
            deptId.push(id);
        });

        res.forEach(({ name }) => {
            deptName.push(name);
        });
        addARole(deptId, deptName)  
       
    })}

    function getRoleId(){
        let roleId = []
        let roleName = []
        connection.query("SELECT * FROM role",(error, res) =>{
            if(error) throw error
            res.forEach(({ id }) => {
                roleId.push(id);
            });
    
            res.forEach(({ title }) => {
                roleName.push(title);
            });
            addAnEmployee(roleId, roleName)  
           
        })}

init();
function quit(){
    process.exit();
}