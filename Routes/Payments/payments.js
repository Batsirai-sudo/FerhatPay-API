const express = require("express");
const router = express.Router();
const dbConnect = require("../../Database/dbconnection");
const isAuth = require("../../Authorization/authMiddleware").isAuth;

router.get("/batsiraiferhatpay/payments", isAuth, (req, res, next) => {
  // we are going to define 3 objects we are going to send to the the clint evrery time
  // we are going to use the following 3
  // 1) authorization    ----     either true or false
  // 2) data             ----     actual data from server
  // 3) error            ----     if an error occurred on requesting data set it to true

  let userid = req.session.passport.user;
  let sql =
    "SELECT account.id, account.AccountBalance, account.AccountNumber, users.Email, users.FullName, users.LastName  FROM  users JOIN account ON users.id = account.UserID WHERE users.id = ?";
  let query = dbConnect.query(sql, [userid], (err, user) => {
    if (err) {
      return res.send({
        data: null,
        authorization: true,
        error: "Database Error",
      });
    }

    // The returned result is one so it an Array with one Object li
    // [  { data we want to send }  ]
    // so its best to send it as object

    if (!user[0]) {
      return res.send({
        data: null,
        authorization: true,
        error: "No User Found",
      });
    }

    if (user[0]) {
      return res.send({ data: user[0], authorization: true, error: false });
    }
  });
});

module.exports = router;
