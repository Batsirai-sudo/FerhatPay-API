const express = require("express");
const router = express.Router();
const dbConnect = require("../../../Database/dbconnection");
const isAuth = require("../../../Authorization/authMiddleware").isAuth;

router.post("/batsiraiferhatpay/checkUser_SendMoney", isAuth, (req, res, next) => {
        console.log('err my error')

 let sql = "SELECT account.*,users.* FROM account JOIN users ON account.UserID = users.id WHERE account.AccountNumber=?";
  let query = dbConnect.query(
    sql,
    [parseInt(req.body.phoneNumber, 10)],
    (err, result) => {
        console.log(err)
        console.log(result)
      if (err) {
        return res.send({
          error: err,
          result: null,
        });
      }
      if (!result.length) {
        res.send({
                      error: null,
                      result: "No User found with this Account",
                      
                    });
      } else {
        return res.send({
          error: null,
          result: "User using this Account Exist",
          data:result[0]
        });
      }
    }
  );
});


  

module.exports = router;


