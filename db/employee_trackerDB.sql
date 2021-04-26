DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department (
id INTEGER NOT NULL AUTO_INCREMENT,
name VARCHAR(30) NOT NULL,
PRIMARY KEY(id)
);

CREATE TABLE roles (
id INTEGER NOT NULL AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
salary DECIMAL(10),
department_id INTEGER NOT NULL,
INDEX department_index(department_id),
CONSTRAINT fk_department FOREIGN KEY(department_id) REFERENCES department(id) ON DELETE CASCADE,
PRIMARY KEY(id)
);

CREATE TABLE employee (
id INTEGER NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INTEGER NOT NULL,
manager_id INTEGER,
INDEX role_index(role_id),
CONSTRAINT fk_role FOREIGN KEY(role_id) REFERENCES role(id) ON DELETE CASCADE,
INDEX manager_index(manager_id),
CONSTRAINT fk_manager FOREIGN KEY(manager_id) REFERENCES employee(id) ON DELETE SET NULL,
PRIMARY KEY(id)
);

INSERT INTO department (name) 
VALUES ('Sales');
INSERT INTO department (name) 
VALUES ('Engineer');
INSERT INTO department (name) 
VALUES ('Management');

INSERT INTO roles (title, salary, department_id)
 VALUES ('Sales Associate', 30000, 1);
INSERT INTO roles (title, salary, department_id) 
VALUES ('Sales Manager', 35000, 2);
INSERT INTO roles (title, salary, department_id) 
VALUES ('Engineer', 40000, 3);
INSERT INTO roles (title, salary, department_id) 
VALUES ('Engineer Manager', 45000, 4);
INSERT INTO roles (title, salary, department_id) 
VALUES ('General Manager', 50000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
ValUES ('LiHua', 'Anderson', 1, 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
ValUES ('Christine', 'Nguyen', 2, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
ValUES ('Daniel', 'Phan', 3, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
ValUES ('David', 'Tran', 4, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
ValUES ('Your', 'Mom', 5, 1);