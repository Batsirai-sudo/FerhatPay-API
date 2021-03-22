const express = require("express");
const router = express.Router();
const dbConnect = require("../../Database/dbconnection");
// const genPassword = require();
const genPassword = require("../../Authentication/passwordUtils/passwordUtils")
  .genPassword;

router.post("/batsiraiferhatpay/passwordReset", (req, res, next) => {
  let passwordHash = genPassword(req.body.password);

  let mySqldata = {
    Password: passwordHash.hash,

    salt: passwordHash.salt,
  };

  Email = req.user.Email;

  let sql = "UPDATE  users SET ? WHERE Email = ?";
  let query = dbConnect.query(sql, [mySqldata, Email], (err, result) => {
    if (err) throw err;

    console.log(result);

    res.send({ inserted: true, error: null });
  });

  /// ...............................................................................
});

module.exports = router;
