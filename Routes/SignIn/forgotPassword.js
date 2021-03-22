var nodemailer = require("nodemailer");
const express = require("express");
const Speakeasy = require("speakeasy"); // speakeasy for generating token and otp
const router = express.Router();
const dbConnect = require("../../Database/dbconnection");

router.post("/batsiraiferhatpay/resetPassword", (req, res, next) => {
  console.log("reset insiide");

  let sql = "SELECT secretToken FROM users WHERE Email=?";
  let query = dbConnect.query(sql, [req.body.email], (err, emailresult) => {
    if (err) {
      console.log("error");
      return res.send({
        error: "Error Occurred while Requesting",
        result: null,
      });
    }

    if (emailresult.length > 0) {
      console.log("sending");
      console.log(emailresult);

      let OTP = {
        token: Speakeasy.totp({
          secret: emailresult[0].secretToken,
          encoding: "base32",
        }),
        remaining: 300 - Math.floor((new Date().getTime() / 1000.0) % 30),
      };

      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "batsybbay@gmail.com",
          pass: "batsirai mucha",
        },
      });
      console.log("reset Pass node");
      var mailOptions = {
        from: "batsybbay@gmail.com",
        to: req.body.email,
        subject: "Ferhat Pay Password Reset",
        //   text: "That was easy!",
        html: `<b style='color:'red''>Your 6 digit pin to reset the password is${OTP.token}</b>`, // html body
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          res.send({
            error: "Email NotSent",
            result: null,
          });
        } else {
          console.log("Email sent: " + info.response);

          let passwordReset = {
            passwordResetStatus: "True",
          };

          let sqltwo = "UPDATE  users SET ? WHERE Email = ?";
          let querytwo = dbConnect.query(
            sqltwo,
            [passwordReset, req.body.email],
            (errors, rows) => {
              if (errors) {
                console.log(errors);

                return res.send({
                  error: "Error Occurred while Requesting",
                  result: null,
                });
              }

              return res.send({
                error: null,
                result: "Email Sent",
                dbToken: emailresult[0].secretToken,
              });
            }
          );
        }
      });
    }

    if (!emailresult.length) {
      console.log("no user not not");

      return res.send({
        error: "",
        result: "No User",
      });
    }
  });
});

module.exports = router;

// const nodemailer = require("nodemailer");

// // async..await is not allowed in global scope, must use a wrapper
// async function main() {
//   // Generate test SMTP service account from ethereal.email
//   // Only needed if you don't have a real mail account for testing
//   let testAccount = await nodemailer.createTestAccount();

//   // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: testAccount.user, // generated ethereal user
//       pass: testAccount.pass, // generated ethereal password
//     },
//   });

//   // send mail with defined transport object
//   let info = await transporter.sendMail({
//     from: "batsybbay@gmail.com", // sender address
//     to: "much.batsy@gmail.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//   // Preview only available when sending through an Ethereal account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }

// main().catch(console.error)
