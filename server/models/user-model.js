const mongoose = require("mongoose");

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

// Model: Acts as a higher-level abstraction that interacts with the database based on the defined schema. It represents a collection and provides an interface for querying , creating , updating and deleting documents in that collection. Models are created from schemas and enable you to work with MongoDB data in a more structured manner in our application.

const User = new mongoose.model("User", userSchema);

module.exports = User;
