const express = require("express");
const router = express.Router();
const dbConnect = require("../../../Database/dbconnection");
const validPassword = require("../../../Authentication/passwordUtils/passwordUtils")
  .validPassword;
const isAuth = require("../../../Authorization/authMiddleware").isAuth;

router.get("/batsiraiferhatpay/security", isAuth, (req, res, next) => {
  // let userid = req.session.passport.user;

  res.send({ data: req.user, authorization: true, error: false });

  // let sql = "SELECT * FROM users WHERE id = ?";
  // dbConnect.query(sql, [userid], (err, user) => {
  //   if (err) {
  //     return res.send({ data: null, authorization: true, error: true });
  //   }
  //   if (!user[0]) {
  //     return res.send({ data: null, authorization: true, error: "Error" });
  //   }

  //   if (user[0]) {
  //     //   console.log(user);

  //     return res.send({ data: user[0], authorization: true, error: false });
  //   }

  //   // if (user[0]) {
  //   //   const isValid = validPassword(
  //   //     req.body.oldPassword,
  //   //     user[0].Password,
  //   //     user[0].salt
  //   //   );
  //   //   if (isValid) {
  //   //     console.log("password correct");
  //   //     return res.send({ data: true, authorization: true, error: false });

  //   //     // return done(null, user[0]);
  //   //   } else {
  //   //     console.log("password not correct");

  //   //     return res.send({ data: false, authorization: true, error: false });

  //   //     // return done(null, false, { message: "Incorrect password." });
  //   //   }
  //   // }
  // });
});

module.exports = router;
