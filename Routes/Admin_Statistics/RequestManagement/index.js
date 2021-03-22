const express = require("express");
const router = express.Router();
const dbConnect = require("../../../Database/dbconnection");

router.post("/batsiraiferhatpay/reply_request", (req, res) => {
    
    const data = req.body
    const id = data.id
    const code = data.code
    const type = data.type
    let type_selector =''
    
    if(type === 'Top-Up'){
        
        type_selector={
            TopUpTransaction:code
        }
    } if(type === 'Withdraw'){
        type_selector={
            WithdrawlTransaction: code
        }
        
    }
    
    
    
    


  let sql =
    "UPDATE AgenttransactionsChecker SET ? WHERE id = ?";
  dbConnect.query(sql, [type_selector, id], (err, result) => {
    if (err) {
        console.log(err)
      return res.send({
        data: null,
        authorization: true,
        error: "Database Error",
      });
    }
    
    if (result) {
        console.log(result)

      return res.send({ data: result, authorization: true, error: false });
    }
  });
});

module.exports = router;
