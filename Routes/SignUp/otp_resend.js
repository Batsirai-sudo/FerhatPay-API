const express = require("express");
const router = express.Router();
const Speakeasy = require("speakeasy"); // speakeasy for generating token and otp
const nexmoOTP = require("../Otp/nexmoSms").nexmoOTP;

router.get("/batsiraiferhatpay/otp-resend", (req, res, next) => {

console.log(req.header('x-api-key'));
console.log(req.header('x-secret-key'));

  let secretKey = Speakeasy.generateSecret({ length: 20 });
  let OTP = {
    token: Speakeasy.totp({
      secret: secretKey.base32,
      encoding: "base32",
    }),
    remaining: 300 - Math.floor((new Date().getTime() / 1000.0) % 30),
  };
  
  // const isSent = nexmoOTP(OTP.token, req.body.phoneNumber);
    res.send({
       result: "Sent",
       otp: OTP.token,
    });
});



module.exports = router;
