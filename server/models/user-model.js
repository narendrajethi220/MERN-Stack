const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// JSON Web Tokens(JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object.

// Often used for Authentication and Authorization in web applications.

// **Components of a JWT : **

// Header:
// Payload:
// Signature:

// Tokens, such as JWTs(JSON Web Tokens), are typically not stored in the database along with other user details. Instead, they are issued by the server during the authentication process and then stored on the client-side(e.g., in cookies or local storage) for later use.

userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    console.error(error);
  }
};

// Model: Acts as a higher-level abstraction that interacts with the database based on the defined schema. It represents a collection and provides an interface for querying , creating , updating and deleting documents in that collection. Models are created from schemas and enable you to work with MongoDB data in a more structured manner in our application.

const User = new mongoose.model("User", userSchema);

module.exports = User;
