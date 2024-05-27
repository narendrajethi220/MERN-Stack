const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
// Schema: Defines the structure of the documents within collection. It specifies the fields, their types, and our additional constraints or validations.

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// Securing the password with the bcrypt

userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) {
    next();
  }
  try {
    const saltRound = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.password, saltRound);
    user.password = hash_password;
  } catch (error) {
    next(error);
  }
});

// Model: Acts as a higher-level abstraction that interacts with the database based on the defined schema. It represents a collection and provides an interface for querying , creating , updating and deleting documents in that collection. Models are created from schemas and enable you to work with MongoDB data in a more structured manner in our application.

const User = new mongoose.model("User", userSchema);

module.exports = User;
