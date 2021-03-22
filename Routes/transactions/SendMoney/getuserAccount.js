const express = require("express");
const router = express.Router();
const dbConnect = require("../../../Database/dbconnection");
const isAuth = require("../../../Authorization/authMiddleware").isAuth;

router.post("/batsiraiferhatpay/getsendMoneyAccount", isAuth, (req, res, next) => {


let userid = req.body.userid
  let sql = "SELECT * FROM account WHERE UserID = ?";

  let query = dbConnect.query(sql,[userid], (err, result) => {
    if (err) throw err;

    console.log(result);
    res.send({ data: result, authorization: true });
  });
});

module.exports = router;