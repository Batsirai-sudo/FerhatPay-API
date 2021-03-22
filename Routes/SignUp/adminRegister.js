const express = require("express");
const router = express.Router();
const dbConnect = require("../../Database/dbconnection");
// const genPassword = require();
const genPassword = require("../../Authentication/passwordUtils/passwordUtils")
  .genPassword;

router.post("/batsiraiferhatpay/admin_registration", (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');

  
        let passwordHash = genPassword(req.body.password);
        
           let mySqldata = {
          FirstName: req.body.firstname,
          LastName: req.body.lastname,
          Password: passwordHash.hash,
          Email: req.body.email,
         
          MobileNumber: req.body.mobile_number,
          salt: passwordHash.salt,
        };
        console.log(mySqldata)

        registerUser(req,res,mySqldata)
        
        



   
});

module.exports = router;



const registerUser = (req,res,mySqldata) =>{
    
         

        
                let sql = "INSERT INTO admin SET ?";
        let query = dbConnect.query(sql, [mySqldata], (err, result) => {
          if (err) throw err;

              if (result) {
                  
                res.send({ inserted: true, error: null });
              }
            }
          );
       

    
    
}



