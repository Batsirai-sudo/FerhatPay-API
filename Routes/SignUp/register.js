const express = require("express");
const router = express.Router();
const dbConnect = require("../../Database/dbconnection");
// const genPassword = require();
const genPassword = require("../../Authentication/passwordUtils/passwordUtils")
  .genPassword;

router.post("/batsiraiferhatpay/registration", (req, res, next) => {

  let sql = "SELECT Email FROM users WHERE Email=?";
  let query = dbConnect.query(
    sql,
    req.body.data.Email,
    (emailerror, result) => {
      if (emailerror) {
        return res.send({
          error: "Error In Requesting User",
          inserted: null,
        });
      }
      if (result.length > 0) {
        // Creating an object to insert data into database
        // req.accountid = result.insertId;
        res.send({
          error: null,
          inserted: false,
        });
      }

      if (!result.length) {
        // Creating an object to insert data into database
        // req.accountid = result.insertId;

        //// ................................Check Email Before cOntinue.......................
        let passwordHash = genPassword(req.body.data.password);
        console.log(passwordHash);
        let user_data = {
          FullName: req.body.data.FullName,
          LastName: req.body.data.LastName,
          Password: passwordHash.hash,
          Email: req.body.data.Email,
          DOB: req.body.dob,
          gender: req.body.gender,
          State: req.body.data.State,
          StreetAddress: req.body.data.StreetAddress,
          NationalID: req.body.data.NationalID,
          StudentID: req.body.data.StudentID,
          salt: passwordHash.salt,
          user_status:'Active',
          passwordResetStatus:"False",
          ContactNo:req.body.mobile_number,
          secretToken: req.body.secret_key
        };
        
        
        
//          OkPacket {
// App 945988 output:   fieldCount: 0,
// App 945988 output:   affectedRows: 1,
// App 945988 output:   insertId: 177,
// App 945988 output:   serverStatus: 2,
// App 945988 output:   warningCount: 0,
// App 945988 output:   message: '',
// App 945988 output:   protocol41: true,
// App 945988 output:   changedRows: 0
// App 945988 output: }
        
        
        
          
         
          
                let ssql = "INSERT INTO users SET ?";
        let queery = dbConnect.query(ssql, [user_data], (err, result) => {
          if (err) throw err;

              if (result) {
                  
                  
         let account_data = {
            UserID: result.insertId,
            Status: "Active",
            AccountBalance: 0,
            AccountNumber:req.body.mobile_number,
          };
                  
                  
                  
                    
                let sql2 = "INSERT INTO account SET ?";
        let query2 = dbConnect.query(sql2, [account_data], (err2, result2) => {
          if (err2) throw err2;

              if (result2) {
        
                                 userIncrementer(()=>{
                                     
                              res.send({ inserted: true, error: null });

                                 })
                  

              }
            }
          );
              }
            }
          );
        

        /// ...............................................................................
      }
    }
  );
});

module.exports = router;





function userIncrementer(callback){
    
    
    
    
  let sql = "SELECT UserCounter FROM statistics WHERE id=1";
  let query = dbConnect.query(sql,(error, result) => {
      
  let calculTotal = result[0].UserCounter + 1


     let increment = {  UserCounter: calculTotal  };

          let sql2 = "UPDATE statistics SET ? WHERE id = 1";
          let query2 = dbConnect.query( sql2,[increment],(error, rows) => {
 
              if (error) throw error;
            if(rows) callback();
            
            
            }
          )

    }
  );
    
    
}
