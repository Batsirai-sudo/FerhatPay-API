const express = require("express");
const router = express.Router();
const dbConnect = require("../../../Database/dbconnection");
const validPassword = require("../../../Authentication/passwordUtils/passwordUtils")
  .validPassword;
const isAuth = require("../../../Authorization/authMiddleware").isAuth;

router.get("/batsiraiferhatpay/accountSettings", isAuth, (req, res, next) => {
  let userid = req.session.passport.user;

  let sql =
    "SELECT *,account.id AS AccountID FROM users JOIN account ON users.id = account.UserID WHERE users.id = ?";
  dbConnect.query(sql, [userid], (err, user) => {
    if (err) {
      return res.send({
        data: null,
        authorization: true,
        error: "Database Error",
      });
    }
    if (!user[0]) {
      return res.send({
        data: null,
        authorization: true,
        error: "No User Found",
      });
    }

    if (user[0]) {
      console.log(user);

      return res.send({ data: user[0], authorization: true, error: false });
    }
  });
});

module.exports = router;
