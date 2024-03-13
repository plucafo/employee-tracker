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
      db.query('SELECT * FROM employees', (err, rows) => {
        if (err) {
          console.error("Error querying database:", err);
          return;
        }
        console.table(rows);
      }); // log the table for testing
    })
    .catch((error) => {
      console.error("Something went wrong:", error);
    });
}

// promptUser();
