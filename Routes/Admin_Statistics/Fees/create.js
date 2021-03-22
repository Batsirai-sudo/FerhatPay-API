const express = require("express");
const router = express.Router();
const dbConnect = require("../../../Database/dbconnection");

router.post("/batsiraiferhatpay/createFee", (req, res) => {



  let sql =
    "INSERT INTO fees SET ?";
  dbConnect.query(sql, [req.body], (err, result) => {
    if (err) {
        console.log(err)
      return res.send({
        data: null,
        authorization: true,
        error: "Database Error",
      });
    }
    
    if (result) {
        console.log(result)

      return res.send({ data: result, authorization: true, error: false });
    }
  });
});
router.post("/batsiraiferhatpay/editFee", (req, res) => {

        const  data={
                    type: req.body.type,
                    amount: req.body.amount,
                    rate: req.body.rate,
                    rate2: req.body.rate2,
                }

  let sql =
    "UPDATE fees SET ? WHERE id = ?";
  dbConnect.query(sql, [data,req.body.id], (err, result) => {
    if (err) {
        console.log(err)
      return res.send({
        data: null,
        authorization: true,
        error: "Database Error",
      });
    }
    
    if (result) {
        console.log(result)

      return res.send({ data: result, authorization: true, error: false });
    }
  });
});



router.get("/batsiraiferhatpay/getAllFees", (req, res) => {



  let sql =
    "SELECT * FROM fees";
  dbConnect.query(sql, [req.body], (err, result) => {
    if (err) {
        console.log(err)
      return res.send({
        data: null,
        authorization: true,
        error: "Database Error",
      });
    }
    
    if (result) {
        console.log(result)

      return res.send({ data: result, authorization: true, error: false });
    }
  });
});

module.exports = router;
