const express = require("express");
const router = express.Router();
const dbConnect = require("../../../../Database/dbconnection");
// const genPassword = require();
// const Speakeasy = require("speakeasy"); // speakeasy for generating token and otp
// const nexmoOTP = require("../Otp/nexmoSms").nexmoOTP;

router.post("/firststepRegisterAgent", (req, res, next) => {
  req.session.accountNumber = req.body.accountNumber;

  //   let UserphoneNumber = {
  //     ContactNo: req.body.phoneNumber,
  //     secretToken: secretKey.base32,
  //     secretStatus: req.body.secretStatus,
  //   };

  let sql = "SELECT AccountNumber FROM account WHERE AccountNumber=?";
  let query = dbConnect.query(
    sql,
    [parseInt(req.body.accountNumber, 10)],
    (err, result) => {
      if (err) {
        return res.send({
          data: null,
          authorization: true,
          error: "Database Error",
        });
      }
      if (!result.length) {
        // Creating an object to insert data into database
        // req.accountid = result.insertId;
        return res.send({
          data: "No User with this Account",
          authorization: true,
          error: false,
        });
      } else {
        res.redirect("/getAgentUser");

        // return res.send({
        //   data: "User using this Account Exist",
        //   authorization: true,
        //   error: false,
        // });
      }
    }
  );
});

router.get("/getAgentUser", (req, res, next) => {
  let sql =
    "SELECT * FROM account JOIN users ON account.UserID = users.id WHERE account.AccountNumber=?";
  let query = dbConnect.query(
    sql,
    [parseInt(req.session.accountNumber, 10)],
    (err, result) => {
      if (err) {
        return res.send({
          data: null,
          authorization: true,
          error: "Database Error",
        });
      }
      if (!result.length) {
        // Creating an object to insert data into database
        // req.accountid = result.insertId;
        return res.send({
          data: "No User with this Account",
          authorization: true,
          error: false,
        });
      }
      if (result) {
        return res.send({
          data: result[0],
          authorization: true,
          error: false,
        });
      }
    }
  );
});

module.exports = router;
