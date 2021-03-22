const express = require("express");
const router = express.Router();
const dbConnect = require("../../../../Database/dbconnection");
const isAuth = require("../../../../Authorization/authMiddleware").isAuth;

router.post("/batsiraiferhatpay/updates", isAuth, (req, res, next) => {
  // we are going to define 3 objects we are going to send to the the clint evrery time
  // we are going to use the following 3
  // 1) authorization    ----     either true or false
  // 2) data             ----     actual data from server
  // 3) error            ----     if an error occurred on requesting data set it to true
  console.log(req.body.update);

  console.log(req.session);
  console.log(req.user);
  console.log(req.isAuthenticated());

  let userid = req.session.passport.user;

  let sql = "UPDATE  users SET ? WHERE id = ?";
  let query = dbConnect.query(sql, [req.body.update, userid], (err, result) => {
    if (err) {
      return res.send({
        data: null,
        authorization: true,
        error: "Database Error",
      });
    }
    console.log(result.affectedRows);

    // The returned result is one so it an Array with one Object li
    // [  { data we want to send }  ]error: "No User Found",
    // so its best to send it as object

    if (!result.affectedRows) {
      return res.send({
        data: null,
        authorization: true,
        error: "No User Found",
      });
    }

    if (result.affectedRows) {
      return res.send({
        data: result.affectedRows,
        authorization: true,
        error: false,
      });
    }
  });
});

module.exports = router;
