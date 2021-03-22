const express = require("express");
const router = express.Router();
const dbConnect = require("../../../Database/dbconnection");
const isAuth = require("../../../Authorization/authMiddleware").isAuth;

router.post("/batsiraiferhatpay/notifyMechand", isAuth, (req, res, next) => {
  //   let inserted = false;

  //   let AccountphoneNumber = {
  //     AccountNumber: parseInt(req.body.phoneNumber, 10),
  //   };

  //   let UserphoneNumber = {
  //     ContactNo: req.body.phoneNumber,
  //     secretToken: secretKey.base32,
  //     secretStatus: req.body.secretStatus,
  //   };
  console.log("notifyMechand");
  let insertsql = "INSERT INTO AgenttransactionsChecker SET ?";
  dbConnect.query(insertsql, req.body.notifyData, (error, row) => {
    if (error) {
      console.log("error");
      console.log(error);

      return res.send({
        error: "Could Not complete Request",
        authorization: true,
      });
    }

    if (row) {
      console.log(row);

      res.send({
        data: row.insertId,
        authorization: true,
        error: false,
      });
    }

    if (!row) {
      res.send({
        data: false,
        authorization: true,
        error: "Not Inserted",
      });
    }
  });
});

module.exports = router;
