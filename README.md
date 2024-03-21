# Employee Tracker

This is a simple Employee Management System built using Node.js, MySQL, and the Inquirer.js library. It allows users to perform various operations such as viewing all employees, adding new employees, updating employee roles, viewing roles and departments, and more.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Database Setup](#database-setup)
- [Dependencies](#dependencies)

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/plucafo/employee-tracker.git
   ```

2. Navigate to the project directory:

   ```bash
   cd employee-tracker
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

## Usage

To run the Employee Management System, follow these steps:

1. Ensure that you have MySQL installed and running on your machine.

2. Set up the database by importing the provided SQL schema file located at ./db/schema.sql.

3. Update the database connection settings in db.js if necessary (host, user, password, database name).

4. Start the application:

   ```
   node index.js
   ```

5. Follow the prompts in the command line interface to perform various operations such as viewing employees, adding new employees, updating roles, and more.

## Database Setup

The Employee Management System uses a MySQL database to store employee, role, and department information. You can set up the database using the provided SQL schema file (./db/schema.sql). Simply import this file into your MySQL database to create the necessary tables and initial data.

## Dependencies

- Node.js
- MySQL2
- Inquirer.js

## Creators

- plucafo