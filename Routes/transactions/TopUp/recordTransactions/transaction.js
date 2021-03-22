const dbConnect = require("../../../../Database/dbconnection");

const getRandomString = require("./transactionIDs").getRandomString;

const transactSummaryRecord = require("../../AllTransactions/index").transactSummaryRecord;


function recordTransactions(posted,initialBalance,finalBalance,user, callback) {
    
     
    const obj = posted.topUpData;
    // user details
    console.log(obj)
    
     const user_id = user.id;
    const user_accountnumber = obj.accountNumber;
    const user_accountid = obj.accountId;
    const user_firstname = user.FullName;
    const user_lastname = user.LastName;
    const user_email = user.Email;
    
    // transactin information
    const topup_transaction_amount = obj.totaltransaction;
    const topup_status = obj.transactionStatus;
    const transaction_fee = obj.transactionfee;
    const transaction_description = obj.transactionDesc;

    const initial_balance = initialBalance;
    const final_balance = finalBalance;
    const transaction_id = getRandomString(10);
    const transaction_ref_id = getRandomString(10);
    
    
    //agent details
    const agent_id = obj.agentID;
    const agent_accountnumber = obj.agentAccountNumber;
    const agent_firstname = obj.agentFirstName;
    const agent_lastname = obj.agentLastName;
    const agent_email = obj.agentEmail;
    
    
    


    
  let topUpTransactionData = {
    UserID: user_id,
    UserAccountNumber: user_accountnumber,
    UserAccountId: user_accountid,
    UserFirstname: user_firstname,
    UserLastname: user_lastname,
    UserEmail: user_email,
    
     TransactionFee: transaction_fee,
    TransactionID: transaction_id,
    TransactionRef: transaction_ref_id,
    TransactionDescription: transaction_description,
        TopupStatus: topup_status,
            Amount: topup_transaction_amount,
            recepientInitialAmount: initial_balance,
            recepientFinalAmount: final_balance,
   
    AgentID: agent_id,
    agentAccountNumber: agent_accountnumber,
    agentFirstname: agent_firstname,
    agentLastname: agent_lastname,
    agentEmail: agent_email,
    
   
  };
  console.log(topUpTransactionData);

  let sql = "INSERT INTO topupTransactions SET ?";
  dbConnect.query(sql, [topUpTransactionData], (error, transactionresults) => {
    if (error) throw error

    if (transactionresults) {
        
        topUpTransactionData.IsAgent = true;
        topUpTransactionData.TransactionType = 'Top_Up'
        topUpTransactionData.RecepientID = agent_id
        topUpTransactionData.RecepientAccountNumber = agent_accountnumber
        topUpTransactionData.RecepientFirstname = agent_firstname
        topUpTransactionData.RecepientLastname = agent_lastname
        topUpTransactionData.RecepientEmail = agent_email


        
        transactSummaryRecord(topUpTransactionData,()=>{
                    callback(transaction_id,transaction_ref_id)

        })

        
    }
  });

   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
}



module.exports.recordTransactions = recordTransactions;
