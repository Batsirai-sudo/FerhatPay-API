const express = require("express");
const router = express.Router();
const dbConnect = require("../../Database/dbconnection");
const isAuth = require("../../Authorization/authMiddleware").isAuth;

router.post("/batsiraiferhatpay/generateQR", (req, res, next) => {
 
 console.log(req.body)
  let transaction = {
        Amount: req.body.amount,
      };

    //   let transsql = "UPDATE  account SET ? WHERE AccountNumber = ?";

  let userid = req.session.passport.user;
  let sql =
    "UPDATE  agentProduct SET ? WHERE UserID = ? AND   Product = ?";
  let query = dbConnect.query(sql, [transaction,userid,req.body.products], (err, result) => {

    // The returned result is one so it an Array with one Object li
    // [  { data we want to send }  ]
    // so its best to send it as object
    
    

    if (result) {
      return res.send({ data: result });
    }
  });
});

module.exports = router;
