const dbConnect = require("../../../Database/dbconnection");

function getTransactionFee(callback) {
    
    let fee_id = 1;




    let sql = "SELECT * FROM transactionsFee  WHERE id = ?";
    dbConnect.query(sql, [fee_id], (error, results) => {

      if (error) throw error

        if (results[0]) {
            callback(results[0])
        }
    });
}



module.exports.getTransactionFee = getTransactionFee;