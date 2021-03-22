const express = require("express");
const router = express.Router();
const dbConnect = require("../../../Database/dbconnection");
const isAuth = require("../../../Authorization/authMiddleware").isAuth;

const transactSummaryRecord = require("../AllTransactions/index").transactSummaryRecord;

const getRandomString = require("./transactionIDs").getRandomString;


//++++++++++++++++++++++++++++++UPDATE RECEPIENT ACCOUNT FIRST+++++++++++++++++++++++++++++++++++++//

router.post("/batsiraiferhatpay/sendCheckOut", isAuth, (req, res, next) => {


const sendSelectedAmount = req.body.sendSelectedAmount;
const sendfee = req.body.sendfee;
const sendAmount = req.body.sendAmount;

const recepientUserid = req.body.recepientUserid;
const recepientAccountnumber = req.body.recepientAccountnumber;


const  recepientFirstname = req.body.firstname;
const  recepientLastname = req.body.lastname;
const  recepientEmail = req.body.email;


// sendSelectedAmount: '900',
// App 292229 output:   sendfee: '10',
// App 292229 output:   sendAmount: 890,
// App 292229 output:   recepientUserid: 1,
// App 292229 output:   recepientAccountnumber: '27671254408',
// App 292229 output:   firstname: 'Silia',
// App 292229 output:   lastname: 'Ku',
// App 292229 output:   email: 'much.batsy@gmail.com'

        console.log(req.body)

  //================================Get Recepient User from Database============================================================//
  
  
  let sql = "SELECT AccountBalance FROM account WHERE UserID = ?";

  dbConnect.query(sql,[recepientUserid], (err, result) => {
    if (err) throw err;
    console.log(result[0].AccountBalance)
        console.log("result")

//================================Calculated Recepient Amount to send to database============================================================//
   if(result){
 const returnRecepientAmount =   result[0].AccountBalance;

const actualrecepientAmount = returnRecepientAmount + sendAmount;




      let setAmountBalance = {
        AccountBalance: actualrecepientAmount
      };


//================================Update recepient amount into from Database============================================================//

let sqltwo = "UPDATE  account SET ? WHERE AccountNumber = ?";

  dbConnect.query(sqltwo,[setAmountBalance,recepientAccountnumber], (errtwo, resulttwo) => {
    if (errtwo) throw errtwo;
    
    
    
    
    
    
    
    
    if(resulttwo){
        
        
        // ++++++++++++++++++++++++++++++++++++++++++UPDATE YOUR ACCOUNT BALANCE+++++++++++++++++++++++++++++++++++++++++++++++++ //
        

       let yourUserid = req.session.passport.user;

        let sqlfour = "SELECT * FROM account WHERE UserID = ?";

   dbConnect.query(sqlfour,[yourUserid], (errfour, resultfour) => {
    if (errfour) throw err;
    
    
 const returnUserAmount =   resultfour[0].AccountBalance;

const actualuserAmount = returnUserAmount - sendSelectedAmount;




      let setUserAmountBalance = {
        AccountBalance: actualuserAmount
      };



let sqlfive = "UPDATE  account SET ? WHERE UserID = ?";

  let querytwo = dbConnect.query(sqlfive,[setUserAmountBalance,yourUserid], (errfive, resultfive) => {
    if (errfive) throw errfive;
    
    if(resultfive){
        
        console.log('resultfour[0]resultfour[0]resultfour[0]resultfour[0]resultfour[0]resultfour[0]resultfour[0]',resultfour[0])
            let userid = req.session.passport.user;
 
      
          let TransactionData = {
              Amount: sendAmount,
    UserID: userid,
    UserAccountNumber: resultfour[0].AccountNumber,
    UserFirstname: req.user.FullName,
    UserLastname: req.user.LastName,
    UserEmail: req.user.Email,
    
    RecepientID: recepientUserid,
    RecepientAccountNumber: recepientAccountnumber,
    RecepientEmail: recepientEmail,
    RecepientLastname: recepientLastname,
    RecepientFirstname: recepientFirstname,
    IsAgent: false,
    TransactionType: 'Send Money',
    TransactionFee: sendfee,
    TransactionID: getRandomString(10),
    TransactionRef: getRandomString(10),
    TransactionDescription: `You have successfully send Money to ${recepientFirstname} amount ${sendAmount} d`
   
  };

       
         transactSummaryRecord(TransactionData,()=>{
             
             
             recordTransactions(TransactionData ,resultfour[0].AccountBalance,actualuserAmount,req,resultfour[0].AccountNumber, ()=>{
                 
                     res.send({ data: resultfive,transactionid:TransactionData.TransactionID,transactionReferneceid:TransactionData.TransactionRef});

             })
             

        })
        
        
    }
    

    
  })
  
  
  
  
  
        
        
  })      
        
        
        // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //

        
        
        
    }
    
    
    
    
    
    
    
    
    
    
    
    




});


}


  });
});

//===================================================================================================//





function recordTransactions(posted,initialBalance,finalBalance,req,useraccountmum, callback) {
    
     
    
     const user_id = req.session.passport.user;
    const user_accountnumber = posted.UserAccountNumber;
    const user_firstname = req.user.FullName;
    const user_lastname = req.user.LastName;
    const user_email = req.user.Email;
    
    // transactin information
    const topup_transaction_amount = posted.Amount;
    const topup_status = 'Success';
    const transaction_fee = posted.TransactionFee;
    const transaction_description = posted.TransactionDescription;

    const initial_balance = initialBalance;
    const final_balance = finalBalance;
    const transaction_id = posted.TransactionID;
    const transaction_ref_id = posted.TransactionRef;
    
    
    //agent details
    const recepientID = posted.RecepientID;
    const recepient_accountnumber = posted.RecepientAccountNumber;
    const recepient_firstname = posted.RecepientFirstname;
    const recepient_lastname = posted.RecepientFirstname;
    const recepient_email = posted.RecepientEmail;
    
    
    


    
  let TransactionData = {
    UserID: user_id,
    UserAccountNumber: user_accountnumber,
    UserFirstname: user_firstname,
    UserLastname: user_lastname,
    UserEmail: user_email,
    
    TransactionFee: transaction_fee,
    TransactionID: transaction_id,
    TransactionRef: transaction_ref_id,
    TransactionDescription: transaction_description,
    sendStatus: topup_status,
    Amount: topup_transaction_amount,
    userInitialAmount: initial_balance,
    userFinalAmount: final_balance,
   
    recepientID: recepientID,
    recepientAccountNumber: recepient_accountnumber,
    recepientFirstname: recepient_firstname,
    recepientLastname: recepient_lastname,
    recepientEmail: recepient_email,
    
   
  };
  console.log(TransactionData);

  let sql = "INSERT INTO sendTransactions SET ?";
  dbConnect.query(sql, [TransactionData], (error, transactionresults) => {
    if (error) throw error

    if (transactionresults) {
        
        
        receivedMoneyUpdate(TransactionData,useraccountmum,()=>{
            
              callback()

        })
        
    

    }
  });

   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
}





function receivedMoneyUpdate(TransactionData,useraccountmum,callback){
    
    
        
  let data = {
    sendUserID: TransactionData.UserID,
    sendAccountNumber:useraccountmum,
    senderName: TransactionData.UserFirstname,
    senderLastName: TransactionData.UserLastname,
    senderEmail: TransactionData.UserEmail,
    
    receiverUserID: TransactionData.recepientID,
    receivedAmount: TransactionData.Amount,
    Transaction: `You have received money from ${TransactionData.UserFirstname} ${TransactionData.UserLastname} amount ${TransactionData.Amount} d`,
    receiveTransactionID:getRandomString(10),
    TransactionRef:TransactionData.TransactionRef,
    receivedStatus:'Success',
    receiveNotification:1,
    
   
  };
  console.log(TransactionData);

  let sql = "INSERT INTO receivedmoney SET ?";
  dbConnect.query(sql, [data], (error, rows) => {
    if (error) throw error

    if (rows) {
        
        
      
              callback()

     
        
    

    }
  });

   
   
   

}




module.exports = router;