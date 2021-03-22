const express = require("express");
const router = express.Router();
const dbConnect = require("../../../Database/dbconnection");
const isAuth = require("../../../Authorization/authMiddleware").isAuth;

const getFee = require("./getTransactionFee").getTransactionFee;
const getBalance = require("./transactionGetValues/getAccountBalance.js").getTransactionBalance;
const updateAccountBalance = require("./UpdateAccount/updateAccountBalance").updateAccountBalance;
const addAmount = require("./calculateTransaction/addAmount").addAmount;

const recordTrans = require("./recordTransactions/transaction").recordTransactions;



const mechantTopUpConfirmation = require("../../MechandsRoute/TopUpMechandiser/topUpCheck")
  .mechantTopUpConfirmation;

router.post(
  "/batsiraiferhatpay/topUpCheckOut",
  isAuth,
  (req, res, next) => {
      
        let userid = req.session.passport.user;
        let accountId = req.body.topUpData.accountId;
        
        let totaltransaction = req.body.topUpData.totaltransaction;
        let transactionfee = req.body.topUpData.transactionfee;

        
        let accountNumber = req.body.topUpData.accountNumber;
        let agentAccountNumber = req.body.topUpData.agentAccountNumber;
        let agentAccountID = req.body.topUpData.agentAccountID;






getBalance(accountId,(balance)=>{ 
          console.log('balancebalancebalancebalancebalancebalance',balance);
           const accBalance = balance.AccountBalance;
          
         const  totalCalculatedTopUp =  addAmount(totaltransaction,accBalance )

    
            console.log('totalCalculatedTopUptotalCalculatedTopUptotalCalculatedTopUp',totalCalculatedTopUp);

  
  const topUpBalanceData = {
          AccountBalance: totalCalculatedTopUp,
        };
        
        
  
  
  updateAccountBalance(topUpBalanceData,accountId,(response)=>{
            console.log('req.bodyreq.bodyreq.bodyreq.body', req.body);

      
      const postedData = req.body
      
      recordTrans( postedData,accBalance,totalCalculatedTopUp,req.user,(transaction_id,transaction_ref_id)=>{
          
          
         return res.send({
        data: true,
        authorization: true,
        error: false,
        transactionid:transaction_id,
        transaction_referenceid:transaction_ref_id
      });  
          
      })
      
      
      
      
      
  })
    
    
})

  }
);


// router.get("/paymentCheckoutTransaction", (req, res, next) => {
//   let userid = req.session.passport.user;
//   console.log(" inside paymentCheckoutTransaction");

//   let acoountID = req.session.accountID;
//   // req.session.transactionFee;
//   // req.session.transactionAmount;
//   // req.session.transactiontype;
//   let notificationStatus = 1;
//   let transactionDescription = " ";
//   if (req.session.transactiontype === "Compo Meal") {
//     transactionDescription = "You have purchased Compo Meal Ticket";
//   }
//   if (req.session.transactiontype === "Breakfast") {
//     transactionDescription = "You have purchased Breakfast Meal Ticket";
//   }
//   if (req.session.transactiontype === "Lunch") {
//     transactionDescription = "You have purchased Lunch Meal Ticket";
//   }
//   if (req.session.transactiontype === "Dinner") {
//     transactionDescription = "You have purchased Dinner Meal Ticket";
//   }

//   let paymentInsertTransactions = {
//     AccountID: acoountID,
//     UserID: userid,
//     TransactionDescription: transactionDescription,
//     Amount: req.session.transactionAmount,
//     TransactionFee: req.session.transactionFee,
//     Transactiontype: req.session.transactiontype,
//     NotificationStatus: notificationStatus,
//     TicketsQuantity: req.session.quantity,
//     // AccountID: parseInt(req.body.phoneNumber, 10),
//   };

//   let insertsql = "INSERT INTO paymentTransactions SET ?";
//   let queryinsert = dbConnect.query(
//     insertsql,
//     paymentInsertTransactions,
//     (errork, row) => {
//       if (errork) {
//         return res.send({
//           error: "Could Not complete Request",
//           result: null,
//         });
//       }

//       if (row) {
//         console.log(row);
//         return res.send({
//           data: row.insertId,
//           authorization: true,
//           error: false,
//         });
//       }
//     }
//   );

//   // transaction id sender& receiver & refid

//   // transaction notification
//   // notification status

//   // let userid = req.session.passport.user;
//   // console.log("inside  updateMechantAmount");
//   // console.log("==========================================mechant inside");
//   // console.log(req.mealMechant);
//   // console.log("============================================mechantout");
//   // let accountid = req.mealMechant;
//   // req.mealMechant = null;
//   // let sql = "SELECT AccountBalance FROM account  WHERE id = ?";
//   // dbConnect.query(sql, [accountid], (error, balanceresults) => {
//   //   console.log(balanceresults[0]);
//   //   if (error) {
//   //     return res.send({ data: null, authorization: true, error: true });
//   //   }
//   //   if (balanceresults[0]) {
//   //     let addBalance =
//   //       parseInt(balanceresults[0].AccountBalance) +
//   //       req.session.totalTransactionAmount;
//   //     console.log(balanceresults[0].AccountBalance);
//   //     console.log(req.session.totalTransactionAmount);
//   //     req.session.totalTransactionAmount = null;
//   //     console.log(addBalance);
//   //     let updateAccountdata = {
//   //       AccountBalance: addBalance,
//   //     };
//   //     let sql = "UPDATE  account SET ? WHERE id = ?";
//   //     let query = dbConnect.query(
//   //       sql,
//   //       [updateAccountdata, accountid],
//   //       (err, rows) => {
//   //         if (err) {
//   //           console.log("error");
//   //           return res.send({ data: null, authorization: true, error: true });
//   //         }
//   //         if (!rows.affectedRows) {
//   //           console.log("not sent");
//   //           return res.send({
//   //             data: null,
//   //             authorization: true,
//   //             error: "Error",
//   //           });
//   //         }
//   //         if (rows.affectedRows) {
//   //           console.log(rows.affectedRows);
//   //           console.log("sent");
//   //           return res.send({
//   //             data: rows.affectedRows,
//   //             authorization: true,
//   //             error: false,
//   //           });
//   //         }
//   //       }
//   //     );
//   //   }
//   // });
// });

module.exports = router;
