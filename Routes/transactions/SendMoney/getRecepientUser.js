

function getRecipientUser(recepientUserid,sendAmount){
    
    
    
    
 
 
 
 
 
  let sql = "SELECT AccountBalance FROM account WHERE UserID = ?";

  dbConnect.query(sql,[recepientUserid], (err, result) => {
    if (err) throw err;
    
   if(result){
       
      let setAmountBalance = {
        AccountBalance: calculateRecepientAmount()
      };


//================================Update recepient amount into from Database============================================================//

let sqltwo = "UPDATE  account SET ? WHERE AccountNumber = ?";

  dbConnect.query(sqltwo,[setAmountBalance,recepientAccountnumber], (errtwo, resulttwo) => {
    if (errtwo) throw errtwo;
    
    
    
    
    
    
    
    
    if(resulttwo){
        
        
        // ++++++++++++++++++++++++++++++++++++++++++UPDATE YOUR ACCOUNT BALANCE+++++++++++++++++++++++++++++++++++++++++++++++++ //
        

       let yourUserid = req.session.passport.user;

        let sqlfour = "SELECT AccountBalance FROM account WHERE UserID = ?";

   dbConnect.query(sqlfour,[yourUserid], (errfour, resultfour) => {
    if (errfour) throw err;
    
    
 const returnUserAmount =   resultfour[0].AccountBalance;

const actualuserAmount = returnUserAmount - sendSelectedAmount;




      let setUserAmountBalance = {
        AccountBalance: actualuserAmount
      };



let sqlfive = "UPDATE  account SET ? WHERE UserID = ?";

  let querytwo = dbConnect.query(sqlfive,[setUserAmountBalance,yourUserid], (errfive, resultfive) => {
    if (errfive) throw errfive;
    
    console.log("resultfive",resultfive)
    res.send({ data: resultfive});

    
  })
  
  
  
  
  
        
        
  })      
        
        
        // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //

        
        
        
    }
    
    
    
    
    
    
    
    
    
    
    
    




});


}


  });
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
    
}


function calculateRecepientAmount(result,sendAmount){
    
         
 const returnRecepientAmount =   result[0].AccountBalance;

const actualrecepientAmount = returnRecepientAmount + sendAmount;



    
 return actualrecepientAmount
}
