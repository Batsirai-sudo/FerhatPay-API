const dbConnect = require("../../../../Database/dbconnection");


function updateAccountBalance(topUpBalanceData,accountId,callback) {
    
   

        let transsql = "UPDATE  account SET ? WHERE id = ?";

        let query = dbConnect.query(
          transsql,
          [topUpBalanceData, accountId],
          (err, rows) => {
            if (err) throw err;
         
            if (rows) {
                
                const response = rows.affectedRows;

         callback(response)
            }
          }
        );


















}



module.exports.updateAccountBalance = updateAccountBalance;
