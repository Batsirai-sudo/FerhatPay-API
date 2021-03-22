const express = require("express");
const router = express.Router();
const dbConnect = require("../../../Database/dbconnection");
const paymentTransaction = require("../../Transactions/Payments/tickets").paymentTransaction;
const getRandomString = require("../../Transactions/Transaction_IDs/transactions").getRandomString;
const ferhatAccount = require("../../FerhatAccount/ferhat").ferhatAccount;



const isAuth = require("../../../Authorization/authMiddleware").isAuth;
const mechantsCheck = require("../../MechandsRoute/MealTicketMechant/mealTicketMechant")
  .mechantsCheck;

router.post("/batsiraiferhatpay/paymentCheckout",   (req, res, next) => {
  let userid = req.session.passport.user;
  console.log(req.body);
  console.log(req.user);

  let feeid = 1;

  let sql = "SELECT * FROM transactionsFee  WHERE id = ?";
  dbConnect.query(sql, [feeid],  (error, results) => {
    console.log(results[0]);

    if (error) {
      return res.send({ data: null, authorization: true, error: true });
    }

    if (results[0]) {
      req.session.transactionFee = results[0].payCombo;
      req.session.transactionAmount = req.body.paymentData.cost;
      req.session.transactiontype = req.body.paymentData.meal;
      req.session.accountID = req.body.paymentData.accountID;
      req.session.quantity = req.body.paymentData.quantity;

      req.totalTransactionAmount =
        parseInt(results[0].payCombo) + req.body.paymentData.cost;
      console.log(req.totalTransactionAmount);
      req.session.totalTransactionAmount = req.totalTransactionAmount;
      let transactionsCalculatedAmount =
        req.body.paymentData.accountbalance - req.totalTransactionAmount;

      console.log(transactionsCalculatedAmount);

      let transactiondata = {
        AccountBalance: transactionsCalculatedAmount,
      };

      let transsql = "UPDATE  account SET ? WHERE AccountNumber = ?";

      let query = dbConnect.query(
        transsql,
        [transactiondata, req.body.paymentData.accountNumber],  (err, rows) => {
          console.log(rows);
          console.log("rows");

          if (err) {
            return res.send({
              data: null,
              authorization: true,
              error: "Database Error",
            });
          }
          
          
             let transactionDesc = " ";
  if (req.body.paymentData.meal === "Compo Meal") {
    transactionDesc = "You have purchased Compo Meal Ticket";
  }
  if (req.body.paymentData.meal === "Breakfast") {
    transactionDesc = "You have purchased Breakfast Meal Ticket";
  }
  if (req.body.paymentData.meal === "Lunch") {
    transactionDesc = "You have purchased Lunch Meal Ticket";
  }
  if (req.body.paymentData.meal === "Dinner") {
    transactionDesc = "You have purchased Dinner Meal Ticket";
  }
          
          
          let senderTransactionid = getRandomString(8);
          let recepientTransactionid =getRandomString(8);
          let refTransactionid = getRandomString(8);
          let transactionDescription = transactionDesc;
          let ticketsQuantity = req.body.paymentData.quantity;
          let transactionAmount =  req.body.paymentData.cost;
          let transactionFee = 10;
          let transactionType = req.body.paymentData.meal
          
          console.log("senderTransactionid",senderTransactionid)

          const parameterData ={
              userid,
              senderTransactionid,
              recepientTransactionid,
              refTransactionid,
              transactionDescription,
              ticketsQuantity,
              transactionAmount,
              transactionFee,
              transactionType
              
              
              
              
          }
          
         


           paymentTransaction(parameterData,dbConnect,(data)=>{
               
               let validTrans = data.trans
               
               ferhatAccount(parameterData,dbConnect,()=>{
                   
                      if (validTrans){
                console.log("Success");

          
          res.send({ transaction_success: validTrans});
          
      }else{
              console.log("Error");

                  res.send({ transaction_success: validTrans});
  
          
      }  
               })
               
             
               
                                     console.log("datadatadatadatadatadatadatadatadata",data);

           });

    //   if (validTrans){
    //             console.log("Success");

          
    //       res.send({ transaction_success: validTrans});
          
    //   }else{
    //           console.log("Error");

    //               res.send({ transaction_success: validTrans});
  
          
    //   }

        //   if (rows.affectedRows) {
        //     let sql =
        //       "SELECT account.AccountBalance  FROM  account  WHERE account.id = ?";
        //     let query = dbConnect.query(sql, [userid], (err, result) => {
        //       if (err) throw err;

        //       console.log(result);
        //       res.redirect("/batsiraiferhatpay/updateMechantAmount");
        //       // res.send({ data: result, authorization: true });
        //     });

        //     // return res.send({
        //     //   data: rows.affectedRows,
        //     //   authorization: true,
        //     //   error: false,
        //     // });
        //   }
        }
      );
    }

    //   if (!user[0]) {
    //     return res.send({ data: null, authorization: true, error: "Error" });
    //   }

    //   if (user[0]) {
    //     console.log(user);

    //     return res.send({ data: user[0], authorization: true, error: false });
    //   }
  });
  // next();
});

// router.get("/batsiraiferhatpay/updateMechantAmount", mechantsCheck, (req, res, next) => {
//   // let userid = req.session.passport.user;
//   console.log("inside  updateMechantAmount");

//   console.log("==========================================mechant inside");

//   console.log(req.mealMechant);
//   console.log("============================================mechantout");

//   let accountid = req.mealMechant;
//   req.mealMechant = null;

//   let sql = "SELECT AccountBalance FROM account  WHERE id = ?";
//   dbConnect.query(sql, [accountid], (error, balanceresults) => {
//     console.log(balanceresults[0]);

//     if (error) {
//       return res.send({ data: null, authorization: true, error: true });
//     }

//     if (balanceresults[0]) {
//       let addBalance =
//         parseInt(balanceresults[0].AccountBalance) +
//         req.session.totalTransactionAmount;
//       console.log(balanceresults[0].AccountBalance);
//       console.log(req.session.totalTransactionAmount);
//       req.session.totalTransactionAmount = null;

//       console.log(addBalance);
//       let updateAccountdata = {
//         AccountBalance: addBalance,
//       };

//       let sql = "UPDATE  account SET ? WHERE id = ?";

//       let query = dbConnect.query(
//         sql,
//         [updateAccountdata, accountid],
//         (err, rows) => {
//           if (err) {
//             console.log("error");

//             return res.send({ data: null, authorization: true, error: true });
//           }

//           if (!rows.affectedRows) {
//             console.log("not sent");

//             return res.send({
//               data: null,
//               authorization: true,
//               error: "Error",
//             });
//           }

//           if (rows.affectedRows) {
//             console.log(rows.affectedRows);
//             console.log("sent");

//             res.redirect("/batsiraiferhatpay/paymentCheckoutTransaction");

//             // return res.send({
//             //   data: rows.affectedRows,
//             //   authorization: true,
//             //   error: false,
//             // });
//           }
//         }
//       );
//     }
//   });
// });

// router.get("/batsiraiferhatpay/paymentCheckoutTransaction", (req, res, next) => {
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
