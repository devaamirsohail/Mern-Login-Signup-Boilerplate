const User = require("../models/User");
const bcrypt = require("bcryptjs");

//get User by ID controller
exports.getUser = (req, res) => {
  const userId = req.params.id;
  User.findById(userId)
    .then(user => {
      if (!user) {
        return res.status(400).json({
          error: "User not found."
        });
      }
      user.password = undefined;
      res.json(user);
    })
    .catch(err => {
      return res.json({
        error: "Something went wrong! Try again."
      });
    });
};
//update user controller
exports.updateUser = (req, res) => {
  const { name, password } = req.body;

  User.findOne({ _id: req.user._id })
    .then(user => {
      if (!user) {
        return res.status(400).json({
          error: "User not found"
        });
      }
      if (!name) {
        return res.status(400).json({
          error: "Name is required"
        });
      }
      if (name.length < 2 || name.length > 30) {
        return res.status(400).json({
          error: "Name must be between 2 to 30 characters"
        });
      }

      if (password) {
        if (password.length < 6) {
          return res.status(400).json({
            error: "Password must be at least 6 characters long"
          });
        } else {
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
              if (err) {
                return res.status(400).json({
                  error: "User update failed! Please try Again."
                });
              }
              user.password = hash;
              user.name = name;
              user
                .save()
                .then(updatedUser => {
                  const { _id, email, name, role } = updatedUser;
                  return res.json({ _id, email, name, role });
                })
                .catch(err =>
                  res.json({
                    error:
                      "Error in updating user in database, please try again."
                  })
                );
            });
          });
        }
      } else {
        user.name = name;
        user
          .save()
          .then(updatedUser => {
            const { _id, email, name, role } = updatedUser;
            return res.json({ _id, email, name, role });
          })
          .catch(err =>
            res.json({
              error: "Error in updating user in database, please try again."
            })
          );
      }
    })
    .catch(err => {
      return res.json({
        error: "Something went wrong! Try again."
      });
    });
};
