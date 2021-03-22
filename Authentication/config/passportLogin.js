const passport = require("passport"); // passport for login authentication
var LocalStrategy = require("passport-local").Strategy;
const dbConnect = require("../../Database/dbconnection");
const validPassword = require("../passwordUtils/passwordUtils").validPassword;

const customFields = {
  // by default, local strategy uses username and password, we will override with email
  usernameField: "email",
  passwordField: "password",
  //passReqToCallback: true, // allows us to pass back the entire request to the callback
};

// username and password are received from the user form and passed into the veriy callback
// and Done function which pass the result of the Auhtentication
// 	// find a user whose email is the same as the forms email
// 	// we are checking to see if the user trying to login already exists
//     connection.query("select * from users where email = '"+email+"'",function(err,rows){
// 		console.log(rows);
// 		console.log("above row object");
// 		if (err)
//             return done(err);
// 		 if (rows.length) {
//             return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
//         } else {

// 			// if there is no user with that email
//             // create the user
//             var newUserMysql = new Object();

// 			newUserMysql.email    = email;
//             newUserMysql.password = password; // use the generateHash function in our user model

// 			var insertQuery = "INSERT INTO users ( email, password ) values ('" + email +"','"+ password +"')";
// 				console.log(insertQuery);
// 			connection.query(insertQuery,function(err,rows){
// 			newUserMysql.id = rows.insertId;

// 			return done(null, newUserMysql);
// 			});
//         }
// 	});
// }));
const verifyCallback = (username, password, done) => {
  console.log("Callback fxn");
  let sql =
    "SELECT users.Email, users.Password, users.salt, users.id, account.AccountNumber FROM account JOIN users ON account.UserID=users.id WHERE account.AccountNumber = ?";
  dbConnect.query(sql, [username], (err, user) => {
    if (err) {
      return done(err);
    }
    console.log(user);

    // retur null wc is no error and false no user to notify passport tt user not found UserID
    if (!user[0]) {
      return done(null, false, { message: "Incorrect username." }); // req.flash is the way to set flashdata using connect-flash
    }

    if (user[0]) {
      console.log(user[0]);
      // if the user is found but the password is wrong
      // if (!(rows[0].Password == password))
      //   return done(
      //     null,
      //     false,
      //     req.flash("loginMessage", "Oops! Wrong password.")
      //   ); // create the loginMessage and save it to session as flashdata
      const isValid = validPassword(password, user[0].Password, user[0].salt);

      if (isValid) {
        return done(null, user[0]);
      } else {
        return done(null, false, { message: "Incorrect password." });
      }
    }
    // console.log(result[0].Email);
  });
};
// =========================================================================
// LOCAL LOGIN =============================================================
// =========================================================================
// we are using named strategies since we have one for login and one for signup
// by default, if there was no name, it would just be called 'local'
const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

// =========================================================================
// passport session setup ==================================================
// =========================================================================
// required for persistent login sessions
// passport needs ability to serialize and unserialize users out of session

// used to serialize the user for the session

passport.serializeUser(function (user, done) {
  done(null, user.id);
  console.log("serialized");
  console.log(user.id);
});

// used to deserialize the user
passport.deserializeUser(function (id, done) {
  console.log("deserialized");

  dbConnect.query("SELECT users.*,account.AccountNumber, account.account_id FROM users JOIN account ON users.id = account.UserID where id = " + id, function (err, rows) {
    done(err, rows[0]);
  });
});
