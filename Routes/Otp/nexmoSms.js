const Nexmo = require("nexmo"); //
// const Speakeasy = require("speakeasy"); // speakeasy for generating token and otp
// const express = require("express");
// const router = express.Router();
// const dbConnect = require("../../Database/dbconnection");

function nexmoOTP(verifyOTP, phoneNum) {
  console.log(`aaaaaaaaaaaa${verifyOTP}`);

  const nexmo = new Nexmo(
    {
      apiKey: "8d312175",
      apiSecret: "rLSBtI07M2cIPakF",
    },
    { debug: true }
  );

  const phone = phoneNum;

  const sender = "Ferhat Team";
  const recipient = phone;
  const message = `Your otp for mobile is ${verifyOTP}`;

  nexmo.message.sendSms(
    sender,
    recipient,
    message,
    { type: "unicode" },
    (error, response) => {
      if (error) {
        console.error(error);
      }

      if (response) {
        console.log(response);
      }
    }
  );
}

module.exports.nexmoOTP = nexmoOTP;

// let tokenOtp = {};
// router.post("/", function (req, res) {
//   let secret = Speakeasy.generateSecret({ length: 20 }); // generating a 32 code secret token

//   let phoneSecret = {
//     secretToken: secret.base32,
//     Password: req.body.phoneNumber,
//     secretStatus: req.body.secretStatus,
//   }; // Creating an object to insert data into database

//   let sql = "INSERT INTO users SET ?";
//   let query = dbConnect.query(sql, phoneSecret, (err, result) => {
//     if (err) {
//       throw err;
//     } else {
//       tokenOtp = {
//         token: Speakeasy.totp({
//           secret: secret.base32,
//           encoding: "base32",
//         }),
//         remaining: 300 - Math.floor((new Date().getTime() / 1000.0) % 30),
//       };

//       console.log(tokenOtp);
//       res.send(result);
//     }
//   });

//   const phone = req.body.phoneNumber;

//   const sender = "Ferhat Team";
//   const recipient = phone;
//   const message = `Your otp for mobile verification is ${tokenOtp}`;

//   console.log(tokenOtp);
//   nexmo.message.sendSms(
//     sender,
//     recipient,
//     message,
//     { type: "unicode" },
//     (error, response) => {
//       if (error) {
//         console.error(error);
//       }

//       if (response) {
//         console.log(response);
//       }
//     }
//   );

//   res.send(tokenOtp);
//   console.log("otp send");
// });

// module.exports = router;

// axios
//   .post("https://textbelt.com/text", {
//     phone: req.body.phoneNumber,
//     message: "Otp from Ferhat Team",
//     key: "textbelt",
//   })
//   .then((response) => {
//     console.log(response.data);
//   });
