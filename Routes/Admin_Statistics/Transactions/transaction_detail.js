const express = require("express");
const router = express.Router();
const dbConnect = require("../../../Database/dbconnection");

router.get("/batsiraiferhatpay/transactions_details", (req, res) => {
    let trans_table = '' 
    let comparison_column = ''
    
    if(req.query.type === "topup"){
        trans_table = 'topupTransactions'
        comparison_column= 'topupTransactions.UserID'

    }
    if(req.query.type === "sendmoney"){
           trans_table = 'sendTransactions'
        comparison_column= 'sendTransactions.UserID'
    }
    if(req.query.type === "withdrawal"){
         trans_table = 'withdrawTransactions'
        comparison_column= 'withdrawTransactions.UserID'

        
    }
    if(req.query.type === "receivedmoney"){
         trans_table = 'receivedmoney'
        comparison_column= 'receivedmoney.receiverUserID'
        
    }


    


  let sql = `SELECT * FROM ${trans_table} JOIN users ON users.id = ${comparison_column} WHERE trans_unique_id=?`;
  console.log(sql)
  console.log(req.query)
  dbConnect.query(sql,req.query.documentid,  (err, result) => {
    if (err) {
      return res.send({
        data: null,
        authorization: true,
        error: err,
      });
      
    }
    
    if (result) {

      return res.send({ data: result, authorization: true, error: false });
    }
  });
});

module.exports = router;
