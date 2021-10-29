USE employees;

INSERT INTO department (name)
VALUES ("Legal"),
       ("Human Resources"),
       ("100 Years of Solitude"),
       ("Things Fall Apart"),
       ("Crime and Punishment"),
       ("Moby Dick"),
       ("Decameron");

INSERT INTO role (title, salary, department_id)
VALUES ("lawyer", 350000, 1),
       ("HR Manager", 80000, 2),
       ("Legal Assistant", 120000, 1),
       ("Things Fall Apart"),
       ("Crime and Punishment"),
       ("Moby Dick"),
       ("Decameron");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Lisa","rozo", 1, NULL),
       ("Vinnie", "Lopez",  3, 1),
       ("100 Years of Solitude"),
       ("Things Fall Apart"),
       ("Crime and Punishment"),
       ("Moby Dick"),
       ("Decameron");
    