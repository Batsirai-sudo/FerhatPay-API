const express = require("express");
const router = express.Router();
const dbConnect = require("../../../Database/dbconnection");

router.get("/batsiraiferhatpay/admin_statistics", (req, res) => {

  let sql =
    "SELECT * FROM statistics";
  dbConnect.query(sql,  (err, result) => {
    if (err) {
      return res.send({
        data: null,
        authorization: true,
        error: "Database Error",
      });
    }
    
    if (result) {

      return res.send({ data: result, authorization: true, error: false });
    }
  });
});

module.exports = router;
