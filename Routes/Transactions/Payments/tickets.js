
function paymentTransaction(transactionData,dbConnect,callback) {
    
    const transactionObject  ={
        
        	SenderUserid: transactionData.userid,
        	TransactionSenderid: transactionData.senderTransactionid,
        	TransactionRecepientid: transactionData.recepientTransactionid,
        	TransactionRefid: transactionData.refTransactionid,
        	TransactionDescription: transactionData.transactionDescription,
        	TickectsQuantity: transactionData.ticketsQuantity,
        	TransactionAmount: transactionData.transactionAmount,
        	TransactionFee: transactionData.transactionFee,
        	TransactionType: transactionData.transactionType
    }
    
    

    
    
    
     let insertsql = "INSERT INTO ticketsTransactions SET ?";
  let queryinsert = dbConnect.query(
    insertsql,
    transactionObject,
    (error, row) => {
        console.log("hsabdcjhkbasjkcbjkCDJBjlasbcjkBADJKCFBjdfo1289ry8912yr82yriowehfjklbfjkb")
      if (error)
      
      {
          console.log(error)
                              let success ={trans: false}

          
          callback(success,error)
          
      }

      if (row) {
                    console.log("SUCCESSIIIIII")
                    let success ={trans: true}
                    callback(success,error)

       
      }else{
                              let success ={trans: false}

                    console.log('ERRORIIIIII')
                    callback(success,error)

          
      }
    }
  );
  

}


module.exports.paymentTransaction = paymentTransaction;




