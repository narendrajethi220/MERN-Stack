const bcrypt = require("bcryptjs");
const User = require("../models/user-model");

const home = async (req, res, next) => {
  try {
    res.status(200).send("Welcome to The Home Page !");
  } catch {
    const status = 404;
    const message = "Page Not Found !";
    const error = {
      status,
      message,
    };
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      const status = 400;
      const message = "Email Already Exists";
      const error = {
        status,
        message,
      };
      next(error);
      return; // Add return to prevent further execution
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password before saving
    const userData = await User.create({
      username,
      email,
      phone,
      password: hashedPassword,
    });
    res.status(200).json({
      msg: "User Successfully Registered",
      token: await userData.generateToken(),
      userId: userData._id.toString(),
    });
  } catch (err) {
    const status = 500; // Use 500 for server errors
    const message = "Internal Server Error";
    const error = {
      status,
      message,
    };
    next(error);
    console.error(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (!userExist) {
      const status = 400;
      const message = "Invalid Credentials";
      const error = {
        status,
        message,
      };
      next(error);
      return; // Add return to prevent further execution
    }
    const isPasswordValid = await bcrypt.compare(password, userExist.password);
    if (isPasswordValid) {
      res.status(200).json({
        msg: "User Login Successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      const status = 401;
      const message = "Invalid Email or Password";
      const error = {
        status,
        message,
      };
      next(error);
    }
  } catch (err) {
    const status = 500;
    const message = "Internal Server Error";
    const error = {
      status,
      message,
    };
    next(error);
  }
};

module.exports = { home, register, login };
