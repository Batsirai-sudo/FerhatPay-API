const express = require("express");
const router = express.Router();
const dbConnect = require("../../../Database/dbconnection");

router.post("/batsiraiferhatpay/mechandWithdrawAccepted", (req, res, next) => {
  // let userid = req.session.passport.user;
  console.log("mechandWithdrawAccepted");
  console.log(req.body);

  let agentCheckerID = req.body.acceptWithdrawData.agentCheckerID;
  let updateAgenttransactionsChecker = {
    WithdrawlTransaction: req.body.acceptWithdrawData.acceptedValue,
  };

  let sql = "UPDATE  AgenttransactionsChecker SET ? WHERE id = ?";

  let query = dbConnect.query(
    sql,
    [updateAgenttransactionsChecker, agentCheckerID],
    (err, rows) => {
      if (err) {
        console.log("error");
        console.log(err);

        return res.send({ data: null, authorization: true, error: true });
      }

      if (!rows.affectedRows) {
        console.log("not sent");

        return res.send({
          data: null,
          authorization: true,
          error: "Error",
        });
      }

      if (rows) {
        console.log(rows);
        console.log("sent");

        return res.send({ data: 1, authorization: true, error: false });

        // return res.send({
        //   data: rows.affectedRows,
        //   authorization: true,
        //   error: false,
        // });
      }
    }
  );
  console.log(query);
});

module.exports = router;
