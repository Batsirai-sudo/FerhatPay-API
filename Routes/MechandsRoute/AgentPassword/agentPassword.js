const express = require("express");
const router = express.Router();
const dbConnect = require("../../../Database/dbconnection");
const isAuth = require("../../../Authorization/authMiddleware").isAuth;
const validPassword = require("../../../Authentication/passwordUtils/passwordUtils")
  .validPassword;

router.post("/batsiraiferhatpay/agentConfirmPassword", isAuth, (req, res, next) => {
  console.log("agentConfirmPassword");

  let userid = req.session.passport.user;

  let sql =
    "SELECT  agent.password, agent.salt  FROM agent  WHERE agent.agentUserID = ?";
  dbConnect.query(sql, [userid], (err, result) => {
    console.log(err);

    if (err) {
      return res.send({
        data: null,
        authorization: true,
        error: "Database Error",
      });
    }
    console.log(result);

    if (result[0]) {
      const isValid = validPassword(
        req.body.password,
        result[0].password,
        result[0].salt
      );

      if (isValid) {
        return res.send({
          data: "Agent Password Correct",
          authorization: true,
          error: false,
        });
      } else {
        return res.send({
          data: "Password wrong and not Correct",
          authorization: true,
          error: false,
        });
      }
    }
    // console.log(result[0].Email);
  });
});

module.exports = router;
