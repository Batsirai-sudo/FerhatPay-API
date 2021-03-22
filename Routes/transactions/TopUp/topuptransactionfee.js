const express = require("express");
const router = express.Router();
const dbConnect = require("../../../Database/dbconnection");
const isAuth = require("../../../Authorization/authMiddleware").isAuth;

router.get("/batsiraiferhatpay/topupfee", isAuth, (req, res, next) => {
   console.log("req.body.id");

  let sql = "SELECT * FROM transactionsFee";
  let query = dbConnect.query(sql, (err, result) => {
    if (err) throw err;

    console.log(result);
    res.send({ data: result, authorization: true });
  });
});

module.exports = router;
