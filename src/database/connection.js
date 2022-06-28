const mysql = require("mysql");

//Database connection custom
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  port: "3300",
  database: "restaurante",
});

module.exports = connection;
