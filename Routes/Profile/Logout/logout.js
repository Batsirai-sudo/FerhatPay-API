const express = require("express");
const router = express.Router();

// If this function for authenticatin for passsport was called and return successRedirect, then  authentication was successful.

router.get("/batsiraiferhatpay/logout", (req, res) => {
  // res.send({ data: null, authorization: false, error: null });
  console.log(req.session);
  console.log(req.user);
  console.log(req.isAuthenticated());
  console.log("==================================================");

  // Passport exposes a logout() function on req (also aliased as logOut()) that can be called from any route handler which needs to terminate a login session. Invoking logout() will remove the req.user property and clear the login session (if any).

  req.logout();

  req.session.destroy(function (err) {
    if (err) {
      return next(err);
    }
    console.log(req.session);
    console.log(req.user);
    console.log(req.isAuthenticated());
    console.log("==================================================");

    return res.send({ data: null, authorization: false, error: null });
  });
});

module.exports = router;
