const express = require("express");
const router = express.Router();
const User = require("./Model");

exports.create = (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  newUser
    .save()
    .then((user) => res.json(user))
    .catch((err) => res.status(200).json(err));
};

exports.GetAll = (req, res) => {
  User.find()
    .then((data) => {
      res.json({ data: data });
    })
    .catch((err) => {
      res.status(200).json(err);
    });
};
exports.GetByID = (req, res) => {
  id = req.params.id;
  User.findById(id)
    .then((data) => {
      res.json({ data: data });
    })
    .catch((err) => {
      res.status(200).json(err);
    });
  exports.delete = (req, res) => {
    id = req.params.id;
    User.findByIdAndRemove(id)
      .then(() => {
        res.json({
          success: true,
          message: "Deleted successfully",
        });
      })
      .catch((err) => {
        res.status(200).json(err);
      });
  };
};
exports.updateByID = (req, res) => {
  id = req.params.id;
  data = req.body;
  User.findByIdAndUpdate(id, { ...data }, { new: true })
    .then(() => {
      res.json({ success: true, data: data, message: "Updated successfully" });
    })
    .catch((err) => {
      res.status(200).json(err);
    });
};

exports.DeleteByID = (req, res) => {
  const id = req.params.id;

  User.findByIdAndDelete(id)
    .then((data) => {
      res.status(200).json({
        success: true,
        data: data,
      });
    })
    .catch((err) => {
      res.status(200).json(err);
    });
};

exports.LoginUser = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(200).json(errorMessage("Email not Found"));
    } else if (password == user.password) {
      res.status(200).json({
        success: true,
        data: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
      });
    } else {
      return res
        .status(200)
        .json(
          errorMessage("Invalid Password: You have Entered Invalid Password")
        );
    }
  });
};
