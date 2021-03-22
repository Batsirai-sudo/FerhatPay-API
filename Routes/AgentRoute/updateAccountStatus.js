const express = require("express");
const router = express.Router();
const dbConnect = require("../../Database/dbconnection");
const isAuth = require("../../Authorization/authMiddleware").isAuth;

router.post("/updateAccountStatus", isAuth, (req, res, next) => {
  let transsql = "UPDATE  agent SET ? WHERE id = ?";

  let query = dbConnect.query(
    transsql,
    [req.body.updateAccounStatus, req.body.agentID],
    (err, rows) => {
      console.log(rows);

      if (err) {
        return res.send({
          data: null,
          authorization: true,
          error: "Database Error",
        });
      }

      if (rows.affectedRows) {
        let sql = "SELECT *  FROM  agent  WHERE id = ?";
        let query = dbConnect.query(sql, [req.body.agentID], (err, result) => {
          if (err) throw err;

          return res.send({
            data: result[0],
            authorization: true,
            error: false,
          });
          // res.send({ data: result, authorization: true });
        });
      }
    }
  );
});

module.exports = router;
