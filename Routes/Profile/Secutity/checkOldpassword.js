const express = require("express");
const router = express.Router();
const dbConnect = require("../../../Database/dbconnection");

const isAuth = require("../../../Authorization/authMiddleware").isAuth;

const validPassword = require("../../../Authentication/passwordUtils/passwordUtils")
  .validPassword;
router.post("/getOldpassword", isAuth, (req, res, next) => {
  const isValid = validPassword(
    req.body.oldPassword,
    req.user.Password,
    req.user.salt
  );
  if (isValid) {
    console.log("password correct");
    return res.send({ data: true, authorization: true, error: false });
  } else {
    console.log("password not correct");

    return res.send({ data: false, authorization: true, error: false });
  }
});

module.exports = router;
