const router = require("express").Router();
const mysqlConnection = require("../mysql");

router.get("/posts", (req, res) => {
  mysqlConnection.query("Select * from users", (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
});

// add message infos to database

const addtoDb = async (user) => {
  //
};

module.exports = router;
