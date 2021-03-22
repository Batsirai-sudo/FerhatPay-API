function ferhatAccount(transactionData,dbConnect,callback) {
    
    const transactionObject  ={
        
        	AccountBalance: transactionData.userid,
        
    }
    
    
    
    
    
    
      let sql = "SELECT AccountBalance FROM ferhatPayAccount ";
  dbConnect.query(sql,  (error, balanceresults) => {



    
      let addBalance = parseInt(balanceresults[0].AccountBalance) + parseInt(transactionData.transactionAmount);
     let accountid = 1
      let updateFerhatAccount = {
        AccountBalance: addBalance,
      };

      let sql = "UPDATE  ferhatPayAccount SET ? WHERE id = ?";

      let query = dbConnect.query(
        sql,
        [updateFerhatAccount, accountid],
        (err, rows) => {


          if (rows.affectedRows) {
           

callback()
          }
        }
      );
    })

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

    
    

}


module.exports.ferhatAccount = ferhatAccount;






