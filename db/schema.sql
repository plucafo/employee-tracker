DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50),
    PRIMARY KEY(id)
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(50),
  departments_id INT NOT NULL,
  salary DECIMAL(10, 2),
  PRIMARY KEY(id),
  FOREIGN KEY (departments_id) REFERENCES departments(id)
);

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    title VARCHAR(50),
    roles VARCHAR(50),
    roles_id INT NOT NULL,
    salary DECIMAL(10, 2),
    manager_id INT,
    PRIMARY KEY(id),
    FOREIGN KEY (roles_id) REFERENCES roles(id),
    FOREIGN KEY (manager_id) REFERENCES employees(id)
);

-- Displays table including the employees role and the managers name instead of the IDs --
SELECT e1.id, e1.first_name, e1.last_name, e1.title,
       r.title AS role, e1.salary,
       CONCAT(e2.first_name, ' ', e2.last_name) AS manager
FROM employees e1
LEFT JOIN employees e2 ON e1.manager_id = e2.id
LEFT JOIN roles r ON e1.roles_id = r.id;

