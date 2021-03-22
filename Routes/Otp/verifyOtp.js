const express = require("express");
const router = express.Router();
const dbConnect = require("../../Database/dbconnection");
const Speakeasy = require("speakeasy"); // speakeasy for generating token and otp

// retrive secret from db and verify token user otp

router.post("/batsiraiferhatpay/verify-otp", (request, response, next) => {


    response.send({
      valid: Speakeasy.totp.verify({
        secret: request.body.secret_key,
        encoding: "base32",
        token: request.body.verification,
        window: 10,
      }),
    });
});

//Resending otp
// router.post("/batsiraiferhatpay/otp-resend", (req, res, next) => {
//   let idr = req.body.id;

//   let sql = "SELECT secretToken FROM users WHERE id = ?";
//   let query = dbConnect.query(sql, [idr], (err, result) => {
//     if (err) throw err;
//     console.log(result[0].secretToken);

//     let resendTokenOtp = {
//       token: Speakeasy.totp({
//         secret: result[0].secretToken,
//         encoding: "base32",
//       }),
//       remaining: 300 - Math.floor((new Date().getTime() / 1000.0) % 30),
//     };
//     res.send(resendTokenOtp);

//     console.log(resendTokenOtp);
//   });
// });

module.exports = router;
