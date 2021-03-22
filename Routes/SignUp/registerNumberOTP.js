const express = require("express");
const router = express.Router();
const dbConnect = require("../../Database/dbconnection");
// const genPassword = require();
const Speakeasy = require("speakeasy"); // speakeasy for generating token and otp
const nexmoOTP = require("../Otp/nexmoSms").nexmoOTP;

router.post("/batsiraiferhatpay/registerNumberOTP", (req, res, next) => {
  let inserted = false;

  let secretKey = Speakeasy.generateSecret({ length: 20 });

  let AccountphoneNumber = {
    AccountNumber: parseInt(req.body.phoneNumber, 10),
  };

  
    

  let OTP = {
    token: Speakeasy.totp({
      secret: secretKey.base32,
      encoding: "base32",
    }),
    remaining: 300 - Math.floor((new Date().getTime() / 1000.0) % 30),
  };

  let sql = "SELECT AccountNumber FROM account WHERE AccountNumber=?";
  let query = dbConnect.query(
    sql,
    [parseInt(req.body.phoneNumber, 10)],
    (err, result) => {
        console.log(err)
      if (err) {
        return res.send({
          error: "Error Occurred while Requesting",
          result: null,
        });
      }
      if (!result.length) {
        

     
            
                 

                    const isSent = nexmoOTP(OTP.token, req.body.phoneNumber);

                    res.send({
                      error: null,
                      result: "Continue",
                      otp: OTP.token,
                      secret_token:secretKey.base32
                    });
                 
               
         
        
      } else {
        return res.send({
          error: null,
          result: "User using this Account Exist",
        });
      }
    }
  );


});

module.exports = router;
