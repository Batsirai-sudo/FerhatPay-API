const passport = require('passport'); // passport for login authentication
var LocalStrategy = require('passport-local').Strategy;
const connection = require('../../../Database/dbconnection');
const validPassword = require('../passwordUtils').validPassword;
const query = require('../queries');

/**
 * By default, local strategy uses username and password,
 *  we will override with email and password
 */
const customFields = {
	usernameField: 'account',
	passwordField: 'password',
//	passReqToCallback: true, // allows us to pass back the entire request to the callback
};
/**
 * @param {email} username
 * @param {password} password
 * @param {callback} done
 * username and password are received from the user
 *  form and passed into the veriy callback
 *  and done function which pass the result of the
 *  Auhtentication
 *  find a user whose email is the same as the forms email
 *  we are checking to see if the user trying to login
 *  already exists
 * return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
 */

const verifyCallback = async (username, password, done) => {
	console.log(' verifyCallback ');
	try {
		const [rows, fields] = await connection.execute(query.getUserByAccountNumber, [username]);
		if (rows.length > 0) {
			const user = rows[0];
			/**
			 * User is found in the database now checking
			 * password is correct
			 * if its wrong req.flash("loginMessage", "Oops! Wrong password.")
			 * create the loginMessage and save it to session as flashdata
			 *
			 */
			const isValid = validPassword(password, user.Password, user.salt);
			return isValid ? done(null, user) : done(null, false, { message: 'Incorrect password.' });
		} else {
			/**
			 * Returning null wc is no error
			 * and but no user is found in database we
			 *  notify passport that no user with the provided
			 *  account number
			 *  req.flash is the way to set flashdata using connect-flash
			 */
			return done(null, false, { message: 'No user found with the credentials you provided.' });
		}
	} catch (error) {
		return done(error);
	}
};

/**
 *  LOCAL LOGIN for email and password
 * we are using named strategies since we have one for login and one for signup
 * by default, if there was no name, it would just be called 'local'
 */
const strategy = new LocalStrategy(customFields, verifyCallback);
passport.use(strategy);

/**
 * Passport session setup
 * required for persistent login sessions
 * passport needs ability to serialize and unserialize users out of session
 * used to serialize the user for the session
 */
passport.serializeUser((user, done) => {
	done(null, user.id);

});

/*
 * Used to deserialize the user
 */
passport.deserializeUser(async (id, done) => {
	try{
	const [rows, fields] = await connection.execute(query.getUserByID, [id]);
	done(null, rows[0]);
	}catch(e){
	    done(null)

	}
});
