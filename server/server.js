const express = require("express");
const router = require("./router/auth-router");
const connectDB = require("./utils/db");
const app = express();

// middleware - parses incoming request bodies with JSON payloads.
app.use(express.json());

app.use("/api/auth", router);
app.use("/api/auth/register", router);
const PORT = 8080;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on the port,${PORT}`);
  });
});
