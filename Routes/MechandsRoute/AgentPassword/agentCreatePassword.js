const express = require("express");
const router = express.Router();
const dbConnect = require("../../../Database/dbconnection");
// const genPassword = require();
const genPassword = require("../../../Authentication/passwordUtils/passwordUtils")
  .genPassword;

router.post("/agentCreatePassword", (req, res, next) => {
  let passwordHash = genPassword(req.body.password);

  let generatedHashPassword = {
    password: passwordHash.hash,

    salt: passwordHash.salt,
  };

  return res.send({
    data: generatedHashPassword,
    authorization: true,
    error: false,
  });

  /// ...............................................................................
});

module.exports = router;
