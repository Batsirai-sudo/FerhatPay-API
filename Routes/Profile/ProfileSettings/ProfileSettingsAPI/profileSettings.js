const express = require("express");
const router = express.Router();
const dbConnect = require("../../../../Database/dbconnection");
const isAuth = require("../../../../Authorization/authMiddleware").isAuth;

router.get("/batsiraiferhatpay/profileSettings", isAuth, (req, res, next) => {
  // we are going to define 3 objects we are going to send to the the clint evrery time
  // we are going to use the following 3
  // 1) authorization    ----     either true or false
  // 2) data             ----     actual data from server
  // 3) error            ----     if an error occurred on requesting data set it to true

  return res.send({ data: req.user, authorization: true, error: false });
});

module.exports = router;
