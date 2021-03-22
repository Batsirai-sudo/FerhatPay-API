const express = require("express");
const router = express.Router();
const dbConnect = require("../../../Database/dbconnection");
const isAuth = require("../../../Authorization/authMiddleware").isAuth;

router.get("/batsiraiferhatpay/mechandiserTopUpcheck", isAuth, (req, res, next) => {
  let userid = req.session.passport.user;
  console.log("/mechandiserTopUpcheck");

  let sql =
    "SELECT * FROM AgenttransactionsChecker  WHERE AgentID = ? AND TopUpTransaction=1 ORDER BY id DESC";

  let query = dbConnect.query(sql, [userid], (err, result) => {
    console.log(result);
    if (err) {
      return res.send({
        data: null,
        authorization: true,
        error: "Database Error",
      });
    }

    if (result) {
      console.log("not  equal to 1");
      req.session.quantity = result;
      res.send({
        data: result,
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
