const inquirer = require("inquirer");
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "employees_db",
});

// Establish database connection
db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to the employees_db database");
  // Start the application after connecting to the database
  promptUser();
});

const questions = [
  {
    type: "list",
    name: "start",
    message: "What would you like to do?",
    choices: ["View All Employees", "Add Employee"],
  },
];

// Inquirer prompt function
function promptUser() {
  inquirer
    .prompt(questions)
    .then((answers) => {
      // Do stuff with answers here
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
          process.exit();
        }
      ); // log the table for testing
    })
    .catch((error) => {
      console.error("Something went wrong:", error);
    });
}

// promptUser();
