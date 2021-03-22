const dbConnect = require("../../../Database/dbconnection");


function transactSummaryRecord(transactData, callback) {
    
     
    // user details
    console.log('transactDatatransactDatatransactDatatransactDatatransactDatatransactDatatransactDatatransactDatatransactDatatransactDatatransactDatatransactDatatransactDatatransactData',transactData)
    
    const { UserID,UserAccountNumber,UserFirstname,UserLastname,UserEmail,RecepientID,RecepientAccountNumber,RecepientEmail,RecepientLastname,RecepientFirstname,IsAgent,TransactionType,TransactionFee,TransactionID,TransactionRef,TransactionDescription,Amount,agentEmail,agentAccountNumber,agentFirstname,AgentID,agentLastname} = transactData;
    
    


    


    
  let summaryData = {
    UserID,
    UserAccountNumber,
    UserFirstname,
    UserLastname,
    UserEmail,

    RecepientID ,
    RecepientAccountNumber,
    RecepientFirstname,
    RecepientLastname,
    RecepientEmail,
    IsAgent:true,
    
    TransactionFee,
    TransactionID,
    TransactionRef,
    TransactionDescription,
    Amount,
    TransactionType
           

   
  };
//   console.log(topUpTransactionData);

  let sql = "INSERT INTO alltransations SET ?";
  dbConnect.query(sql, [summaryData], (error, transactionresults) => {
    if (error) throw error

    if (transactionresults) {
        callback()

        
    }
  });

   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
}



module.exports.transactSummaryRecord = transactSummaryRecord;
