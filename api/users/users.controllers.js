const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require('../models');
const { JWT_SECRET, JWT_TOKEN_EXP } = process.env;  // not sure 
 
exports.signup = async (req, res , next) => {
  try {
    // hash the password with 10  rounds
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;

    // create new user
    const user = await User.create(req.body);

    // respond with 201 status and a message
  //   res.status(201).json({ message: "User created successfully", user });
  // } catch (error) {
  //   next(error);
  const token = generateToken(user);

  //change to respond with the token
  res.status(201).json({ message: "User created successfully", token });
} catch (error) {
  next(error);
}
  };

exports.signin = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json("Server Error");
  }
  const user = req.user;//

  // Step 1: Call generateToken and pass it the user object
  const token = generateToken(user); //
  res.status(200).json({ token });//
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("urls");
    res.status(201).json(users);
  } catch (err) {
    next(err);
  }
};


const generateToken = (user) => {
  // Step 3: Create the payload
  const payload = {
    username: user.username,
    _id: user._id,
  };

  // Step 4: Return the JWT token
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_TOKEN_EXP, // Duration of the token
  });
};

module.exports = {
  signin,
};