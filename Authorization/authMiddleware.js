module.exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("authorization accepted");
    next();
  }
  if (!req.isAuthenticated()) {
    console.log("authorization rejected");

    res.json({ authorization: false });
  }
};
