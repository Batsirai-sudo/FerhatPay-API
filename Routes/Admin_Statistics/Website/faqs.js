const express = require("express");
const router = express.Router();
const dbConnect = require("../../../Database/dbconnection");

router.get("/batsiraiferhatpay/faqs", (req, res) => {

  let sql =
    "SELECT * FROM faqs";
  dbConnect.query(sql,  (err, result) => {
    if (err) {
      return res.send({
        data: null,
        authorization: true,
        error: err,
      });
      
    }
    
    if (result) {

      return res.send({ data: result, authorization: true, error: false });
    }
  });
});


router.get("/batsiraiferhatpay/testimonials", (req, res) => {

  let sql =
    "SELECT * FROM testimonials";
  dbConnect.query(sql,  (err, result) => {
    if (err) {
      return res.send({
        data: null,
        authorization: true,
        error: err,
      });
      
    }
    
    if (result) {

      return res.send({ data: result, authorization: true, error: false });
    }
  });
});

module.exports = router;
