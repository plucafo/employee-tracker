const inquirer = require("inquirer");
const db = require("./db");

// Inquirer prompt function
function promptUser() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "start",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "Add Employee",
          "Delete Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          "Exit",
        ],
      },
    ])
    .then((answers) => {
      // Do stuff with answers here
      switch (answers.start) {
        case "View All Employees":
          viewAllEmployees();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Delete Employee":
          deleteEmployee();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "View All Roles":
          viewAllRoles();
          break;
        case "Add Role":
          addRole();
          break;
        case "View All Departments":
          viewAllDepartments();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Exit":
          console.log("Bye!");
          process.exit();
        default:
          console.log("Invalid selection");
      }
    })
    .catch((error) => {
      console.error("Something went wrong:", error);
    });
}

// Function to view all employees
function viewAllEmployees() {
  db.query(
    `SELECT e1.id, e1.first_name, e1.last_name, e1.title,
    r.title AS role, e1.salary,
    CONCAT(e2.first_name, ' ', e2.last_name) AS manager
    FROM employees e1
    LEFT JOIN employees e2 ON e1.manager_id = e2.id
    LEFT JOIN roles r ON e1.roles_id = r.id;`,
    (err, rows) => {
      if (err) {
        console.error("Error querying database:", err);
        return;
      }
      console.table(rows);
      promptUser();
    }
  );
}

// Function to fetch roles from the database
function fetchRoles(callback) {
  db.query(`SELECT id, title FROM roles`, (err, rows) => {
    if (err) {
      console.error("Error fetching roles:", err);
      callback([]);
      return;
    }
    callback(rows);
  });
}

// Function to fetch managers from the database
function fetchManagers(callback) {
  db.query(
    `SELECT id, CONCAT(first_name, ' ', last_name) AS manager_name FROM employees WHERE manager_id IS NULL`,
    (err, rows) => {
      if (err) {
        console.error("Error fetching managers:", err);
        callback([]);
        return;
      }
      callback(rows);
    }
  );
}

// Function to prompt user for employee details and add the employee
function addEmployee() {
  fetchRoles((roles) => {
    fetchManagers((managers) => {
      inquirer
        .prompt([
          {
            type: "input",
            name: "firstName",
            message: "Enter employee's first name:",
          },
          {
            type: "input",
            name: "lastName",
            message: "Enter employee's last name:",
          },
          {
            type: "input",
            name: "title",
            message: "Enter employee's title:",
          },
          {
            type: "list",
            name: "roleId",
            message: "Select employee's role:",
            choices: roles.map((role) => ({
              name: role.title,
              value: role.id,
            })),
          },
          {
            type: "input",
            name: "salary",
            message: "Enter employee's salary:",
          },
          {
            type: "list",
            name: "managerId",
            message: "Select employee's manager:",
            choices: managers.map((manager) => ({
              name: manager.manager_name,
              value: manager.id,
            })),
          },
        ])
        .then((answers) => {
          db.query(
            `INSERT INTO employees (first_name, last_name, title, roles_id, salary, manager_id) VALUES (?, ?, ?, ?, ?, ?)`,
            [
              answers.firstName,
              answers.lastName,
              answers.title,
              answers.roleId,
              answers.salary,
              answers.managerId,
            ],
            (err, result) => {
              if (err) {
                console.error("Error adding employee:", err);
                return;
              }
              console.log("Employee added successfully!");
              promptUser();
            }
          );
        })
        .catch((error) => {
          console.error("Something went wrong:", error);
        });
    });
  });
}

// Function to delete an employee
function deleteEmployee() {
  // Fetch the list of employees from the database
  db.query(
    `SELECT id, CONCAT(first_name, ' ', last_name) AS full_name FROM employees`,
    (err, rows) => {
      if (err) {
        console.error("Error fetching employee list:", err);
        promptUser();
        return;
      }

      // Display the list of employees in a table format
      console.table(rows);

      // Extract the list of employee IDs from the fetched rows
      const employeeIds = rows.map((employee) => employee.id);

      inquirer
        .prompt([
          {
            type: "input",
            name: "employeeId",
            message: "Enter the ID of the employee you want to delete:",
          },
        ])
        .then((answer) => {
          const employeeId = parseInt(answer.employeeId);
          if (isNaN(employeeId) || !employeeIds.includes(employeeId)) {
            console.log("Invalid employee ID. Please enter a valid number.");
            deleteEmployee(); // Prompt user to enter employee ID again
            return;
          }

          // Call db.query to delete the selected employee
          db.query(
            `DELETE FROM employees WHERE id = ?`,
            [employeeId],
            (err, result) => {
              if (err) {
                console.error("Error deleting employee:", err);
                return;
              }
              console.log("Employee deleted successfully!");
              promptUser(); // Optional: Prompt user again after deleting employee
            }
          );
        })
        .catch((error) => {
          console.error("Something went wrong:", error);
        });
    }
  );
}

// Function to update an employees role
function updateEmployeeRole() {
  // Fetch the list of employees from the database
  db.query(
    `SELECT id, CONCAT(first_name, ' ', last_name) AS full_name FROM employees`,
    (err, rows) => {
      if (err) {
        console.error("Error fetching employee list:", err);
        promptUser();
        return;
      }

      // Display the list of employees in a table format
      console.table(rows);

      // Extract the list of employee IDs from the fetched rows
      const employeeIds = rows.map((employee) => employee.id);

      // Fetch the list of roles from the database
      db.query(`SELECT id, title FROM roles`, (err, roles) => {
        if (err) {
          console.error("Error fetching roles:", err);
          promptUser();
          return;
        }

        inquirer
          .prompt([
            {
              type: "input",
              name: "employeeId",
              message: "Enter the ID of the employee you want to update:",
            },
            {
              type: "list",
              name: "roleId",
              message: "Select the new role for the employee:",
              choices: roles.map((role) => ({
                name: role.title,
                value: role.id,
              })),
            },
          ])
          .then((answers) => {
            const employeeId = parseInt(answers.employeeId);
            const roleId = parseInt(answers.roleId);

            if (isNaN(employeeId) || !employeeIds.includes(employeeId)) {
              console.log("Invalid employee ID. Please enter a valid number.");
              updateEmployeeRole(); // Prompt user to enter employee ID and role again
              return;
            }

            // Call db.query to update the employee's role
            db.query(
              `UPDATE employees SET roles_id = ? WHERE id = ?`,
              [roleId, employeeId],
              (err, result) => {
                if (err) {
                  console.error("Error updating employee role:", err);
                  return;
                }
                console.log("Employee role updated successfully!");
                promptUser(); // Optional: Prompt user again after updating employee role
              }
            );
          })
          .catch((error) => {
            console.error("Something went wrong:", error);
          });
      });
    }
  );
}

// Function to view the roles table
function viewAllRoles() {
  db.query(`SELECT * FROM roles`, (err, rows) => {
    if (err) {
      console.error("Error querying database:", err);
      return;
    }
    console.table(rows);
    promptUser();
  });
}

// Function to view the departments table
function viewAllDepartments() {
  db.query(`SELECT * FROM departments`, (err, rows) => {
    if (err) {
      console.error("Error querying database:", err);
      return;
    }
    console.table(rows);
    promptUser();
  });
}

// Function to add a new role to the roles table
function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "roleName",
        message: "Enter the name of the new role:",
        validate: function (value) {
          if (value.trim() === "") {
            return "Role name cannot be empty. Please enter a valid role name.";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "roleSalary",
        message: "Enter the salary for the new role:",
        validate: function (value) {
          if (isNaN(value) || parseFloat(value) <= 0) {
            return "Invalid salary. Please enter a valid number greater than 0.";
          }
          return true;
        },
      },
      {
        type: "list",
        name: "departmentId",
        message: "Select the department for the new role:",
        choices: function () {
          return new Promise((resolve, reject) => {
            db.query(`SELECT id, name FROM departments`, (err, rows) => {
              if (err) {
                reject("Error fetching departments.");
              } else {
                resolve(
                  rows.map((department) => ({
                    name: department.name,
                    value: department.id,
                  }))
                );
              }
            });
          });
        },
      },
    ])
    .then((answers) => {
      db.query(
        `INSERT INTO roles (title, salary, departments_id) VALUES (?, ?, ?)`,
        [answers.roleName, answers.roleSalary, answers.departmentId],
        (err, result) => {
          if (err) {
            console.error("Error adding role:", err);
            return;
          }
          console.log("Role added successfully!");
          promptUser();
        }
      );
    })
    .catch((error) => {
      console.error("Something went wrong:", error);
    });
}

// Function to add a new department to the departments table
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "departmentName",
        message: "Enter the name of the new department:",
        validate: function (value) {
          if (value.trim() === "") {
            return "Department name cannot be empty. Please enter a valid department name.";
          }
          return true;
        },
      },
    ])
    .then((answers) => {
      db.query(
        `INSERT INTO departments (name) VALUES (?)`,
        [answers.departmentName],
        (err, result) => {
          if (err) {
            console.error("Error adding department:", err);
            return;
          }
          console.log("Department added successfully!");
          promptUser();
        }
      );
    })
    .catch((error) => {
      console.error("Something went wrong:", error);
    });
}

promptUser();
