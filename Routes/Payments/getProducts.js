const express = require("express");
const router = express.Router();
const dbConnect = require("../../Database/dbconnection");
const isAuth = require("../../Authorization/authMiddleware").isAuth;

router.get("/batsiraiferhatpay/getProducts", (req, res, next) => {
 

  let userid = req.session.passport.user;
  let sql =
    "SELECT *  FROM  agentProduct WHERE UserID = ?";
  let query = dbConnect.query(sql, [userid], (err, result) => {

   
    
        if (result) {
            
            getTransactionFee((response)=>{
                
                     return res.send({ data: result,trasactionfees: response });
 
            })
    }


   

  });
});


function getTransactionFee(callback){
    
    
    
  let sql = "SELECT * FROM transactionsFee";
  let query = dbConnect.query(sql, (err, result) => {
    if (err) throw err;

    if(result){
        callback(result)
    }
  });
}


















module.exports = router;
