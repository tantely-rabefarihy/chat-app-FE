const router = require("express").Router();

const mysqlConnection = require("../mysql");

router.get("/posts", (req, res) => {
  mysqlConnection.query("SELECT * FROM users ORDER BY date ", (err, rows) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
});

// add message infos to database

// router.post("/add", (req, res) => {
//   const { name, email, post, date } = req.body;
//   console.log(req.body);
//   // inserting record to db
//   const sql = "INSERT INTO users (name, post, email, date) VALUES (?,?,?,?)";

//   mysqlConnection.query(sql, [name, post, email, date], (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(result);
//       return result;
//     }
//   });
// });

module.exports = router;
