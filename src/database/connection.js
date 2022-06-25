const mysql = require("mysql");

//Database connection custom
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  port: "3306",
  database: "restaurante",
});

module.exports = connection;
