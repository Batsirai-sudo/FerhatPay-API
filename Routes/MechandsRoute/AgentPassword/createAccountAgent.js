const express = require("express");
const router = express.Router();
const dbConnect = require("../../../Database/dbconnection");
const genPassword = require("../../../Authentication/passwordUtils/passwordUtils")
  .genPassword;

router.post("/batsiraiferhatpay/createAgentAccount", (req, res, next) => {
    
    const passwordhash = genPassword(req.body.agent_password);
    
    const data = {
   agentAccountNumber: req.body.AccountNumber,
   agentUserID: req.body.id,
   agentReferenceNumber: getRandomString(6),
   agentAccountStatus: false,
   password:passwordhash.hash ,
   salt: passwordhash.salt,
   Mobile: req.body.ContactNo,
   };
    
    

  let insertsql = "INSERT INTO agent SET ?";
  let queryinsert = dbConnect.query(
    insertsql,
    data,
    (errork, row) => {
      if (errork) {
        return res.send({
          error: "Could Not complete Request",
          result: null,
        });
      } else {
        //..............................................................
        res.send({
          error: false,
          data: row,
        });


      }
    }
  );


});

function getRandomString(length) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result.toUpperCase();
}





module.exports = router;
