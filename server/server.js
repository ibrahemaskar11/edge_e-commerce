require("dotenv").config({
  path: "./config.env",
});
const cookieParser = require("cookie-parser");
const path = require("path");
const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middleWare/error");
connectDB();

const app = express();
app.use(require("cors")());
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/private", require("./routes/private"));
app.use("/api/items", require("./routes/items"));
app.use("/api/cart", require("./routes/cart"));
app.use("/api/order", require("./routes/order"));
app.use("/api/wish", require("./routes/wishList"));
const PORT = process.env.PORT || 5000;

// __dirname = path.resolve();
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/app/build")));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "/app", "build", "index.html"));
//   });
// } else {
//   app.get("/", (req, res) => {
//     res.send("Welcome to CORS server 😁");
//   });
// }

app.use(errorHandler);
const server = app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});
process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => {
    process.exit(1);
  });
});
