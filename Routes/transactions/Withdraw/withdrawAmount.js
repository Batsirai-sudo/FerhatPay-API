const express = require("express");
const router = express.Router();
const dbConnect = require("../../../Database/dbconnection");
const isAuth = require("../../../Authorization/authMiddleware").isAuth;
const getFee = require("../Transaction_Fees/getTransactionFee").getTransactionFee;

router.get("/batsiraiferhatpay/withdrawAmount", isAuth, (req, res, next) => {
  // we are going to define 3 objects we are going to send to the the clint evrery time
  // we are going to use the following 3
  // 1) authorization    ----     either true or false
  // 2) data             ----     actual data from server
  // 3) error            ----     if an error occurred on requesting data set it to true

  let userid = req.session.passport.user;
  let sql =
    "SELECT account.account_id AS accountID, users.id AS userID, users.FullName,users.LastName,users.Email, account.AccountBalance, account.AccountNumber  FROM account  JOIN users ON users.id = account.UserID WHERE users.id = ?";
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
         getFee((results)=>{
                  return res.send({ data: user[0],fee:results, authorization: true, error: false });

        })
      
    }
  });
});

module.exports = router;
