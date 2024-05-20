const express = require("express");
const router = express.Router();

router.route("/").get((req, res) => {
  res.status(200).send("Hello from the Server from auth-routes");
});
router.route("/register").get((req, res) => {
  res.status(200).send("Welcome to the registration Page");
});

module.exports = router;
