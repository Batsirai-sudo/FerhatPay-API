const express = require("express");
const router = express.Router();
const dbConnect = require("../../Database/dbconnection");
const isAuth = require("../../Authorization/authMiddleware").isAuth;

router.get("/batsiraiferhatpay/compoMealTicketsPrizes", (req, res, next) => {
  // console.log(req.body.id);

  let sql = "SELECT * FROM productPrizes";
  let query = dbConnect.query(sql,  (err, result) => {
    if (err) throw err;

    

    
     getTransactionFee((response)=>{
                
                     return res.send({ data: result,transactionfees: response ,authorization: true});
 
            })
    
  });
});

module.exports = router;






function getTransactionFee(callback){
    
    
    
  let sql = "SELECT * FROM transactionsFee";
  let query = dbConnect.query(sql, (err, result) => {
    if (err) throw err;

    if(result){
        callback(result)
    }
  });
}


