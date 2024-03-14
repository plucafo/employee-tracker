INSERT INTO departments (name)
VALUES ('Sales'),
       ('Engineering'),
       ('Finance'),
       ('Legal');

INSERT INTO roles (title, departments_id, salary)
VALUES ('Sales Lead', 1, 100000.00),
       ('Salesperson', 1, 80000.00),
       ('Lead Engineer', 2, 150000.00),
       ('Software Engineer', 2, 120000.00),
       ('Account Manager', 3, 160000.00),
       ('Accountant', 3, 125000.00),
       ('Legal Team Lead', 4, 250000.00),
       ('Lawyer', 4, 190000.00);

INSERT INTO employees (first_name, last_name, title, roles, roles_id, salary, manager_id)
VALUES ('John', 'Doe', 'Sales Lead', 'Sales', 1, 100000.00, NULL),
       ('Mike', 'Chan', 'Salesperson', 'Sales', 2, 80000.00, 1),
       ('Ashley', 'Rodriguez', 'Lead Engineer', 'Engineering', 3, 150000.00, NULL),
       ('Kevin', 'Tupik', 'Software Engineer', 'Engineering', 4, 120000.00, 3),
       ('Kunal', 'Singh', 'Account Manager', 'Finance', 5, 160000.00, NULL),
       ('Malia', 'Brown', 'Accountant', 'Finance', 6, 125000.00, 5),
       ('Sarah', 'Lourd', 'Legal Team Lead', 'Legal', 7, 250000.00, NULL),
       ('Tom', 'Allen', 'Lawyer', 'Legal', 8, 190000.00, 7);