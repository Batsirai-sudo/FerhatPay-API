const dbConnect = require("../../../Database/dbconnection");

module.exports.mechantWithdrwalConfirmation = (req, res, next) => {
  // let userid = req.session.passport.user;

  let sql =
    "SELECT WithdrawTransaction,id FROM AgenttransactionsChecker  WHERE AgentID = ? ORDER BY id";
  let query = dbConnect.query(
    sql,
    [req.body.topUpData.agentAccountID],
    (err, result) => {
      console.log(result);
      console.log("gotten result");
      if (err) {
        console.log("error");
        throw err;
      }
      if (result[0].TopUpTransaction === 0) {
        console.log("result equal 1");
        res.send({
          data: true,
          authorization: true,
          error: false,
        });
      }

      if (result[0].TopUpTransaction === 1) {
        console.log("notequal 1");
        next();
      }
    }
  );
};
