const express = require("express");
const app = express();
const mongoDB = require("./db");
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With , Content-Type,Accept" //Allow backend to use it in frontend
  );
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
app.listen(5000, function () {
  console.log("server is running");
});
