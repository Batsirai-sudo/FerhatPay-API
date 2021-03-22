const express = require("express");
const router = express.Router();

router.get("/batsiraiferhatpay/splashScreenAuth", (req, res, next) => {
  console.log('req.user',req.user);
 
  if (req.isAuthenticated()) {
    res.send({
      authorization: req.isAuthenticated(),
      user:req.user
    });
  }
  if (!req.isAuthenticated()) {
    res.send({
      authorization: req.isAuthenticated(),
      
    });
  }
});

module.exports = router;
