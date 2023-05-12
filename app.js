const express = require("express");
const app = express();
const cors = require('cors');

require("dotenv").config();
app.use(cors());

const PORT = process.env.PORT || 5000;
const mongoDB = require("./db");
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

mongoDB();
app.get("/", function (req, res) {
  // res.sendFile(__dirname+"x.html");
  res.send("Hello world!");
});
app.use(express.json());
app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.listen(PORT, function () {
  console.log("server is running");
});
