DROP DATABASE IF EXISTS info_db;

CREATE DATABASE info_db;

USE info_db;

CREATE TABLE department (
id INT NOT NULL AUTO_INCREMENT,
PRIMARY KEY (id),
name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
id INT NOT NULL AUTO_INCREMENT,
PRIMARY KEY (id),
title VARCHAR(30) NOT NULL,
salary DECIMAL NOT NULL,
department_id INT NOT NULL
);

CREATE TABLE employee (
id INT NOT NULL AUTO_INCREMENT,
PRIMARY KEY (id),
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT NOT NULL,
manager_id int
);

-- insert example info
INSERT INTO department (name) VALUES ("Home Finances");
INSERT INTO department (name) VALUES ("Landscape");
INSERT INTO department (name) VALUES ("Marketing");
INSERT INTO department (name) VALUES ("Distribution");

INSERT INTO roles (title, salary, department_id) VALUES ("Salesman", 8000, 1);
INSERT INTO roles (title, salary, department_id) VALUES ("Host", 9845, 2);
INSERT INTO roles (title, salary, department_id) VALUES ("Manager", 875, 3);
INSERT INTO roles (title, salary, department_id) VALUES ("Intern", 0, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Josh", "Zip", 1, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Amanda", "Dolo", 4, 9);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("James", "me", 2, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Abby", "Ybba", 3, 41);

-- join examples
SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name, roles.salary, employee.manager_id
	FROM employee
    LEFT JOIN roles ON employee.role_id = roles.id
    LEFT JOIN department ON roles.department_id = department.id;