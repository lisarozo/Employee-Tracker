const connection = require('./connection');
class DB{
    constructor(connection) {
        this.connection = connection;
    }

    viewAllDepartments() {
        return this.connection.promise().query(
            "SELECT department.id, department.name FROM department;"
        );
    }
    viewAllRoles() {
        return this.connection.promise().query(
            "SELECT role.title, role.id FROM role;"
        );
    }
    viewAllEmployees() {
        return this.connection.promise().query(
            "SELECT employee.id, employee.name FROM employee;"
        );
    }
    addADepartment() {
        return this.connection.promise().query(
            "SELECT department.id, department.name FROM department;"
        );
    }
    addARole() {
        return this.connection.promise().query(
            "SELECT department.id, department.name FROM department;"
        );
    }
    addAnEmployee() {
        return this.connection.promise().query(
            "SELECT employee.id, employee.first_name,  FROM employee;"
        );
    } 
    updateAnEmployeeRole() {
        return this.connection.promise().query(
            "SELECT department.id, department.name FROM department;"
        );
    }
}
module.export = new DB(connection);
