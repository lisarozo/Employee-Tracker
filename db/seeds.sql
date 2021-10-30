USE employees;

INSERT INTO department (name)
VALUES ("Legal"),
       ("Human Resources"),
       ("Accounting"),
       ("Engineering");
       

INSERT INTO role (title, salary, department_id)
VALUES ("lawyer", 350000, 1),
       ("HR Manager", 80000, 2),
       ("Legal Assistant", 120000, 1);
     

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Lisa","Rozo", 1, NULL),
       ("Vanessa", "Lopez",  2, 1),
       ("Kenneth", "Martinez", 3, 2);
       
    