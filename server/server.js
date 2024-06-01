require("dotenv").config();
const express = require("express");
const router = require("./router/auth-router");
const connectDB = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");
const app = express();

// middleware - parses incoming request bodies with JSON payloads.
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello From the backend ! ");
});

app.use("/api/auth", router);
app.use("/api/auth/register", router);
app.use(errorMiddleware);
const PORT = 8080;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on the port,${PORT}`);
  });
});
