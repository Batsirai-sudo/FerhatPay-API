const dbConnect = require("../../../../Database/dbconnection");


function getTransactionBalance(accountId,callback) {
    
   

    let sql = "SELECT AccountBalance FROM account  WHERE id = ?";
    dbConnect.query(sql, [accountId], (error, balance) => {
      console.log(balance[0]);

       if (error) throw error


        if (balance[0]) {
            callback(balance[0])
        }
    });
}



module.exports.getTransactionBalance = getTransactionBalance;
