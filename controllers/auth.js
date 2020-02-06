const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const _ = require("lodash");
const { OAuth2Client } = require("google-auth-library");
const fetch = require("node-fetch");
const nodemailer = require("nodemailer");

let transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});

//Load User Model
const User = require("../models/User");

//Load Input Validation
const validateSignupInput = require("../validator/signup");
const validateSigninInput = require("../validator/signin");
const validateForgotPasswordInput = require("../validator/forgotPassword");
const validateResetPasswordInput = require("../validator/resetPassword");

//Signup Controller
exports.signup = (req, res) => {
  const { errors, isValid } = validateSignupInput(req.body);
  //Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { name, email, password } = req.body;
  User.findOne({ email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const token = jwt.sign(
        { name, email, password },
        process.env.JWT_ACCOUNT_ACTIVATION,
        { expiresIn: "60m" }
      );
      //Account activation email data
      const emailData = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "Account Activation Link",
        html: `
            <h1>Please use the following link to activte your account</h1>
            <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
            <hr/>
            <p>This email may contain sensitive information.</p>
            <p>${process.env.CLIENT_URL}</p>
            `
      };
      transport.sendMail(emailData, function(err, info) {
        if (err) {
          errors.message = err.message;
          return res.json(errors);
        } else {
          return res.json({
            message: `Email has been sent to ${email}, Follow the instruction to activate your account.`
          });
        }
      });
    }
  });
};

//Account activation controller
exports.accountActivation = (req, res) => {
  const { token } = req.body;
  console.log(req.body);

  //verify token
  if (token) {
    jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, (err, decoded) => {
      if (err) {
        console.log("Error verifying JWT token:", err);
        return res.status(401).json({
          error: "Link has expired, Signup Again."
        });
      }
      // Extract user information from token
      // Hash password
      // Save user to database

      const { name, email, password } = jwt.decode(token);
      const newUser = new User({ name, email, password });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            return res.status(400).json({
              error: "User update failed! Please try Again."
            });
          }
          newUser.password = hash;
          newUser
            .save()
            .then(user =>
              res.json({
                message: "You have successfully signup, please login."
              })
            )
            .catch(err =>
              res.json({
                error: "Error in saving user to database, please signup again."
              })
            );
        });
      });
    });
  } else {
    return res.status(400).json({
      error: "Something went wrong, please try again."
    });
  }
};

//Signin Controller
exports.signin = (req, res) => {
  const { errors, isValid } = validateSigninInput(req.body);
  //Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { email, password } = req.body;
  //Check for user
  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(400).json({
          error: "User not found, Please Signup."
        });
      }
      //Check Password
      bcrypt
        .compare(password, user.password)
        .then(isMatch => {
          //authenticate
          if (!isMatch) {
            return res.status(400).json({
              error: "Password incorrect"
            });
          }
          // Sign token and send to user
          const token = jwt.sign(
            {
              _id: user._id
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "60m"
            }
          );
          const { _id, name, email, role } = user;
          return res.json({
            token,
            user: { _id, name, email, role }
          });
        })
        .catch(err => {
          console.log("Authentication Error:", err);
          return res.json({
            message: "Something went wrong, Please try again."
          });
        });
    })
    .catch(err => {
      console.log("Signin Error:", err);
      return res.json({
        message: "Something went wrong, Please try again."
      });
    });
};

//Authenticate user with token
exports.requireSignin = expressJwt({
  credentialsRequired: true,
  secret: process.env.JWT_SECRET //req.user
});

// Authenticate Admin
exports.adminMiddleware = (req, res, next) => {
  User.findById(req.user._id).then(user => {
    if (!user) {
      return res.status(400).json({
        error: "User not found."
      });
    }
    if (user.role !== "admin") {
      return res.status(400).json({
        error: "Admin resources. Access denied."
      });
    }
    req.profile = user;
    next();
  });
};

//Forgot Password
exports.forgotPassword = (req, res) => {
  const { errors, isValid } = validateForgotPasswordInput(req.body);
  //Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { email } = req.body;
  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res
          .status(400)
          .json({ error: "User with email does not exist" });
      } else {
        const token = jwt.sign(
          { _id: user._id, name: user.name },
          process.env.JWT_RESET_PASSWORD,
          { expiresIn: "60m" }
        );
        //Password Reset email data
        const emailData = {
          from: process.env.EMAIL_FROM,
          to: email,
          subject: "Reset Password Link",
          html: `
            <h1>Please use the following link to reset your password</h1>
            <p>${process.env.CLIENT_URL}/reset-password/${token}</p>
            <hr/>
            <p>This email may contain sensitive information.</p>
            <p>${process.env.CLIENT_URL}</p>
            `
        };
        return user.updateOne({ resetPasswordLink: token }, (err, success) => {
          if (err) {
            return res.status(400).json({
              error:
                "Database connection error on user password forgot request."
            });
          } else {
            //send email with account activation link
            transport
              .sendMail(emailData)
              .then(sent => {
                return res.json({
                  message: `Email has been sent to ${email}, Follow the instruction to reset your password.`
                });
              })
              .catch(err => {
                return res.json({ error: err.message });
              });
          }
        });
      }
    })
    .catch(err => {
      return res.json({
        error: "Something went wrong, Please try again."
      });
    });
};
//Reset Password
exports.resetPassword = (req, res) => {
  const { errors, isValid } = validateResetPasswordInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { resetPasswordLink, newPassword } = req.body;
  if (resetPasswordLink) {
    jwt.verify(
      resetPasswordLink,
      process.env.JWT_RESET_PASSWORD,
      (err, decoded) => {
        if (err) {
          return res.status(400).json({
            error: "Link has expired, Try again."
          });
        }
        User.findOne({ resetPasswordLink }, (err, user) => {
          if (err || !user) {
            return res.status(400).json({
              error: "Something went wrong, Try again later."
            });
          }
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newPassword, salt, (err, hash) => {
              if (err) {
                return res.status(400).json({
                  error: "Password Reset failed! Please try Again."
                });
              }
              const updatedFields = {
                password: hash,
                resetPasswordLink: ""
              };
              user = _.extend(user, updatedFields);
              user.save((err, result) => {
                if (err) {
                  return res.status(400).json({
                    error:
                      "Error resetting user password to database, Try again."
                  });
                }
                res.json({
                  message: "Great! Now you can login with your new password."
                });
              });
            });
          });
        });
      }
    );
  }
};
//Google Login
const client = new OAuth2Client(process.env.GOOLE_CLIENT_ID);
exports.googleLogin = (req, res) => {
  const { idToken } = req.body;

  client
    .verifyIdToken({ idToken, audience: process.env.GOOLE_CLIENT_ID })
    .then(response => {
      //console.log("Google Login Response", response);
      const { email_verified, name, email } = response.payload;
      if (email_verified) {
        User.findOne({ email }, (err, user) => {
          if (user) {
            const token = jwt.sign(
              {
                _id: user._id
              },
              process.env.JWT_SECRET,
              {
                expiresIn: "60m"
              }
            );
            const { _id, email, name, role } = user;
            return res.json({
              token,
              user: { _id, email, name, role }
            });
          } else {
            let genPassword = email + process.env.JWT_SECRET;
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(genPassword, salt, (err, hash) => {
                if (err) {
                  return res.status(400).json({
                    error: "Error Occured! Please try Again."
                  });
                }
                const password = hash;
                user = new User({ name, email, password });
                user.save((err, data) => {
                  if (err) {
                    console.log("User signup with google error:", err);
                    return res.status(400).json({
                      error: "User signup with google failed, Try again."
                    });
                  }
                  const token = jwt.sign(
                    { _id: data._id },
                    process.env.JWT_SECRET,
                    {
                      expiresIn: "7d"
                    }
                  );
                  const { _id, email, name, role } = data;
                  return res.json({
                    token,
                    user: { _id, email, name, role }
                  });
                });
              });
            });
          }
        });
      } else {
        return res.status(400).json({
          error: "Google login failed, Try again."
        });
      }
    });
};
