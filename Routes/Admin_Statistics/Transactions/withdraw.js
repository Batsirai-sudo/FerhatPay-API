const express = require("express");
const router = express.Router();
const dbConnect = require("../../../Database/dbconnection");

router.get("/batsiraiferhatpay/withdraw_transactions", (req, res) => {

  let sql =
    "SELECT * FROM withdrawTransactions JOIN users ON users.id = withdrawTransactions.UserID ORDER BY trans_unique_id DESC";
  dbConnect.query(sql,  (err, result) => {
      console.log(err)
    if (err) {
      return res.send({
        data: null,
        authorization: true,
        error: err,
      });
      
    }
    
    if (result) {
              console.log(result)


      return res.send({ data: result, authorization: true, error: false });
    }
  });
});

module.exports = router;
