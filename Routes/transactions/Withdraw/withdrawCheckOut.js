const express = require("express");
const router = express.Router();
const dbConnect = require("../../../Database/dbconnection");
const isAuth = require("../../../Authorization/authMiddleware").isAuth;

const getBalance = require("./transactionGetValues/getAccountBalance.js").getTransactionBalance;
const updateAccountBalance = require("./UpdateAccount/updateAccountBalance").updateAccountBalance;
const subtractAmount = require("./calculateTransaction/subtractAmount").subtractAmount;

const recordTrans = require("./recordTransactions/transaction").recordTransactions;


const mechantWithdrwalConfirmation = require("../../MechandsRoute/WithdrawMechandiser/withdrwalCheck")
  .mechantWithdrwalConfirmation;

router.post(
  "/batsiraiferhatpay/withdrawCheckOut",
  isAuth,
  (req, res, next) => {
      
      console.log('hhhhhhhhhhhhhhhhhh withdrawCheckOut')
      
        let userid = req.session.passport.user;
        let accountId = req.body.withdrawData.accountId;
        
        let totaltransaction = req.body.withdrawData.totaltransaction;
        let transactionfee = req.body.withdrawData.transactionfee;

        
        let accountNumber = req.body.withdrawData.accountNumber;
        let agentAccountNumber = req.body.withdrawData.agentAccountNumber;
        let agentAccountID = req.body.withdrawData.agentAccountID;






getBalance(accountId,(balance)=>{ 
           const accBalance = balance.AccountBalance;
          
         const  totalCalculatedWithdrawal =  subtractAmount(totaltransaction,accBalance )

    
            console.log('totalCalculatedTopUptotalCalculatedTopUptotalCalculatedTopUp',totalCalculatedWithdrawal);

  
  const withDrawBalanceData = {
          AccountBalance: totalCalculatedWithdrawal,
        };
        
        
  
  
  updateAccountBalance(withDrawBalanceData,accountId,(response)=>{
      
      const postedData = req.body
      
      recordTrans( postedData,accBalance,totalCalculatedWithdrawal,req.user,(transaction_id,transaction_ref_id)=>{
          
          
         return res.send({
        data: true,
        authorization: true,
        error: false,
         transaction_referenceid: transaction_ref_id,
  transactionid: transaction_id,
      });  
          
      })
      
      
      
      
      
  })
    
    
})

  }
);

router.get("/batsiraiferhatpay/topUpTransactions", (req, res, next) => {
  // let userid = req.session.passport.user;
  console.log("inside  topUpTransactions");

  let UserID = req.session.UserID;
  let UserAccountNumber = req.session.UserAccountNumber;
  let UserAccountId = req.session.UserAccountId;
  let TopupStatus = "Success";
  let AgentID = req.session.AgentID;
  let agentAccountNumber = req.session.agentAccountNumber;
  let agentAccountID = req.session.agentAccountID;
  let Amount = req.session.topUpAmount;
  let TransactionID = 123;
  let TransactionRef = 123;
  let Transaction = "You have Successfully credited your Account with";
  let TransactionFee = req.session.topUpfee;

  let topUpTransactionData = {
    UserID: UserID,
    UserAccountNumber: UserAccountNumber,
    UserAccountId: UserAccountId,
    TopupStatus: TopupStatus,
    AgentID: AgentID,
    agentAccountNumber: agentAccountNumber,
    agentAccountID: agentAccountID,
    Amount: Amount,
    TransactionFee: TransactionFee,
    TransactionID: TransactionID,
    TransactionRef: TransactionRef,
    Transaction: Transaction,
  };
  console.log(topUpTransactionData);

  let sql = "INSERT INTO topupTransactions SET ?";
  dbConnect.query(sql, [topUpTransactionData], (error, transactionresults) => {
    if (error) {
      console.log(error);
      return res.send({ data: null, authorization: true, error: true });
    }
    console.log(transactionresults);

    if (transactionresults) {
      return res.send({
        data: true,
        authorization: true,
        error: false,
      });
    }
  });
});

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
