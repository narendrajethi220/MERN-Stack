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
    res.status(200).json({ msg: userData });
  } catch (error) {
    console.error(error);
    res.status(404).json("Page Not Found !");
  }
};

module.exports = { home, register };
