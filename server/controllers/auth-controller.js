const bcrypt = require("bcryptjs");
const User = require("../models/user-model");

const home = async (req, res) => {
  try {
    res.status(200).send("Welcome to The Home Page !");
  } catch {
    res.status(404).send({
      msg: "Page Not Found !",
    });
  }
};

const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ msg: "Email Already Exists" });
    }

    const userData = await User.create({ username, email, phone, password });
    res.status(200).json({
      msg: "User Successfully Registered",
      token: await userData.generateToken(),
      userId: userData._id.toString(),
    });
  } catch (error) {
    console.error(error);
    res.status(404).json("Page Not Found !");
  }
};
// In most cases, converting _id to a string is a good practice bcoz it ensures consistency and compatibility across different JWT libraries and systems. It also aligns with the expectations that claims in a JWT are represented as strings.

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, userExist.password);
    if (isPasswordValid) {
      res.status(200).json({
        msg: "User Login Successfull",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({
        msg: "Invalid Email or Password",
      });
    }
  } catch (error) {
    res.status(500).json("internal server error");
  }
};

module.exports = { home, register, login };
