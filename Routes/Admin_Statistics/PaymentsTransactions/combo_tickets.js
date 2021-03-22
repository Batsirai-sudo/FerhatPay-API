const express = require("express");
const router = express.Router();
const dbConnect = require("../../../Database/dbconnection");

router.get("/batsiraiferhatpay/combo_tickets_transactions", (req, res) => {

  let sql =
    "SELECT * FROM paymentTransactions JOIN users ON users.id = paymentTransactions.Buyer_UserID WHERE paymentTransactions.Transactiontype = 'Compo Meal' ";
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
