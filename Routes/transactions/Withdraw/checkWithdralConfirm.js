const express = require("express");
const router = express.Router();
const dbConnect = require("../../../Database/dbconnection");
const isAuth = require("../../../Authorization/authMiddleware").isAuth;

router.post("/batsiraiferhatpay/checkWithdrawConfirmation", isAuth, (req, res, next) => {
  let userid = req.session.passport.user;
  console.log("/checkWithdrawConfirmation");

  let sql =
    "SELECT WithdrawlTransaction FROM AgenttransactionsChecker  WHERE id = ?";

  let query = dbConnect.query(sql, [req.body.notifyID], (err, result) => {
    console.log(result);
    if (err) {
      console.log(err);

      return res.send({
        data: null,
        authorization: true,
        error: "Database Error",
      });
    }
    if (result[0].WithdrawlTransaction === 2) {
      console.log("result equal 1");
      res.send({
        data: 2,
        authorization: true,
        error: false,
      });
    }

    if (result[0].WithdrawlTransaction === 1) {
      console.log("not  equal to 1");

      res.send({
        data: result[0].WithdrawlTransaction,
        authorization: true,
        error: false,
      });
    }
  });
});

module.exports = router;

// module.exports.mechantTopUpConfirmation = (req, res, next) => {
//   let sql =
//     "SELECT TopUpTransaction FROM AgenttransactionsChecker  WHERE RecepientUserID = ? AND TopUpTransaction=1";
//   let query = dbConnect.query(
//     sql,
//     [req.body.topUpData.agentAccountID],
//     (err, result) => {
//       console.log(result);
//       console.log("gotten result");
//       if (err) {
//         console.log("error");
//         throw err;
//       }
//       if (result[0].TopUpTransaction === 0) {
//         console.log("result equal 1");
//         res.send({
//           data: true,
//           authorization: true,
//           error: false,
//         });
//       }

//       if (result[0].TopUpTransaction === 1) {
//         console.log("notequal 1");
//         next();
//       }
//     }
//   );
// };
