const express = require("express");
const router = express.Router();
const dbConnect = require("../../../Database/dbconnection");

router.get("/batsiraiferhatpay/sendmoney_activity", (req, res) => {

  let sql =
    "SELECT * FROM sendTransactions JOIN users ON users.id = sendTransactions.UserID WHERE sendTransactions.UserAccountNumber=? ORDER BY trans_unique_id DESC LIMIT 5";
  dbConnect.query(sql, [req.query.accountnumber], (err, result) => {
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


router.get("/batsiraiferhatpay/topup_activity", (req, res) => {

  let sql =
    "SELECT * FROM topupTransactions JOIN users ON users.id = topupTransactions.UserID WHERE topupTransactions.UserAccountNumber=? ORDER BY trans_unique_id DESC LIMIT 5";
  dbConnect.query(sql,  [req.query.accountnumber], (err, result) => {
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



router.get("/batsiraiferhatpay/withdraw_activity", (req, res) => {

  let sql =
    "SELECT * FROM withdrawTransactions JOIN users ON users.id = withdrawTransactions.UserID  WHERE withdrawTransactions.UserAccountNumber=?  ORDER BY trans_unique_id DESC LIMIT 5";
  dbConnect.query(sql, [req.query.accountnumber], (err, result) => {
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



router.post("/batsiraiferhatpay/activate_diactivate_account", (req, res) => {
    
    const data ={
            Status: req.body.Status,
            }

  let sql =
    "UPDATE account SET ? WHERE AccountNumber =?";
  dbConnect.query(sql, [data, req.body.accountNumber], (err, result) => {
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
