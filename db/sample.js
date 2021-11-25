const connection = require('./connection');
class DB{
    constructor(connection) {
        this.connection = connection;
    }

    findAllDepartments() {
        console.log("INSIDE DB VIEW ALL DEPARTMENTS");
        // return this.connection.promise().query(
        //     "SELECT department.id, department.name FROM department;"
        // );
    }
    viewAllRoles() {
        return this.connection.promise().query(
            "SELECT role.title, role.id FROM role;"
        );
    }
    viewAllEmployees() {
        return this.connection.promise().query(
            "SELECT employee.first_name, employee.last_name FROM employee;"
        );
    }
    addADepartment(department) {
        return this.connection.promise().query(
            "INSERT INTO department SET " + department + ";"
            
        );
    }
    addARole(role) {
        return this.connection.promise().query(
            "INSERT INTO role SET " + role + ";"
        );
    }
    addAnEmployee(employee) {
        return this.connection.promise().query(
            "INSERT INTO employee SET " + employee + ";"
        );
    } 
    updateAnEmployeeRole(role_id, employeeid) {
        return this.connection.promise().query(
            "UPDATE employee SET role_id = " + role_id + " WHERE id = " + employeeid + ";"
        );
    }
}
module.export = new DB(connection);


