const express = require("express");
const router = express.Router();
const dbConnect = require("../../Database/dbconnection");
const Speakeasy = require("speakeasy"); // speakeasy for generating token and otp

// retrive secret from db and verify token user otp

router.post("/batsiraiferhatpay/verify-resetPassword", (request, response, next) => {
  let dbToken = request.body.dbToken;
  let verification = request.body.verification;

  console.log({
    valid: Speakeasy.totp.verify({
      secret: dbToken,
      encoding: "base32",
      token: request.body.verification,
      window: 10,
    }),
  });

  response.send({
    valid: Speakeasy.totp.verify({
      secret: dbToken,
      encoding: "base32",
      token: request.body.verification,
      window: 10,
    }),
  });
});

module.exports = router;
