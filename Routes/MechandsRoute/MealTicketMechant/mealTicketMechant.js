const dbConnect = require("../../../Database/dbconnection");

module.exports.mechantsCheck = (req, res, next) => {
  // let userid = req.session.passport.user;

  let sql = "SELECT * FROM merchants  WHERE Duty = 'MealTickets'";
  let query = dbConnect.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    if (result) {
      console.log("inside  mechantsCheck");

      console.log(result);
      req.mealMechant = result[0].AccountID;

      next();
    }
  });
};
