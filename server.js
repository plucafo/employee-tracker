const express = require("express");
const mysql = require("mysql2");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Create connection to mysql database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // Empty string for no password
  database: "employees_db",
});

db.query("SELECT * FROM employees", (err, data) => {
  console.log(data);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
