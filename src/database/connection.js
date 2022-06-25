const mysql = require("mysql");

//Database connection custom

/*

@Leonardo ao efetuar a merge atenção com as minhas configurações abaixo / tem que ser alteradas (host)

*/

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  port: "3306",
  database: "restaurante",
});

module.exports = connection;
