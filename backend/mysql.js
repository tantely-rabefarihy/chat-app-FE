const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

const mysqlConnection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  multipleStatements: true,
});

mysqlConnection.connect((err) => {
  if (!err) {
    console.log("🔌 Connected !");
  } else {
    console.log(err);
    console.log("🚀 Hello Houston, we have an issue here");
  }
});

module.exports = mysqlConnection;
