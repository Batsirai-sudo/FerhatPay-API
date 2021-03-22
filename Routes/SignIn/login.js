const express = require("express");
const router = express.Router();
const passport = require("passport");

// If this function for authenticatin for passsport was called and return successRedirect, then  authentication was successful.

router.post(
  "/batsiraiferhatpay/login",
  passport.authenticate("local", {
    successRedirect: "/batsiraiferhatpay/login-success",
    failureRedirect: "/batsiraiferhatpay/error",
  })
);

router.get("/batsiraiferhatpay/error", (req, res) => {
  res.send({ loginSuccess: false });
  console.log("cancelled process");
});

router.get("/batsiraiferhatpay/login-success", (req, res) => {
  
  res.send({ loginSuccess: true,user: req.user, });
});

module.exports = router;
