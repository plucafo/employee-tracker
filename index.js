const inquirer = require("inquirer");
const mysql = require("mysql2");

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
      console.log(answers); // log for testing
    })
    .catch((error) => {
      console.error("Something went wrong:", error);
    });
}

promptUser();
