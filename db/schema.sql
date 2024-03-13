DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(20),
    last_name VARCHAR(20),
    title VARCHAR(50),
    department VARCHAR(50),
    salary DECIMAL(10, 2)
);