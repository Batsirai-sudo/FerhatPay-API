const express = require("express");
const router = express.Router();
const dbConnect = require("../../../Database/dbconnection");

router.get("/batsiraiferhatpay/transactions_details", (req, res) => {

  let sql =
    "SELECT * FROM agent JOIN users ON users.id = agent.agentUserID JOIN account ON users.id = account.UserID";
  dbConnect.query(sql,  (err, result) => {
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
