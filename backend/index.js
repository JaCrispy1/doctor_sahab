const express = require("express");
const { json } = require("body-parser");
const authRoute = require("./routes/auth");
const app = express();
const managerRoute = require("./routes/manager");
const adminRoute = require("./routes/admin");

const cors = require("cors");
const { connect } = require("mongoose");
app.use(json());
app.use(cors());

require("dotenv").config();

// Connect to DB Mongo DB
connect(process.env.CONNECT, () => {
  console.log({ message: "Connected Succesfully" });
});

// Route MiddleWare
app.use("/api/user", authRoute);
app.use("/api/manager", managerRoute);
app.use("/api/admin", adminRoute);

app.get("/api", (req, res) => {
  res.json({
    message: "Server Working",
  });
});

app.listen(process.env.PORT, () => {
  console.log("Server Started");
});
