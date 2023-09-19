const mysql = require("mysql2");

const connectDb = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mydb",
});

module.exports = connectDb;
