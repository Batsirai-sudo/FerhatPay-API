const express = require("express");
const router = express.Router();
const dbConnect = require("../../Database/dbconnection");
const isAuth = require("../../Authorization/authMiddleware").isAuth;

router.get("/batsiraiferhatpay/agentList", isAuth, (req, res, next) => {
  let sql = "SELECT * FROM agent JOIN users ON users.id = agent.agentUserID ";

  let query = dbConnect.query(sql, (err, agentResults) => {
    if (err) {
      return res.send({
        data: null,
        authorization: true,
        error: "Database Error",
      });
    }
    if (!agentResults) {
      return res.send({
        data: null,
        authorization: true,
        error: "No User Found",
      });
    }

    if (agentResults) {
      return res.send({
        data: agentResults,
        authorization: true,
        error: false,
      });
    }
  });
});

module.exports = router;
