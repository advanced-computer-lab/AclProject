const express = require("express");
const mongoose = require("mongoose");
const flightCon = require("./flightCon");

app.use(express.json());
app.use("/flight", flightCon);

const PORT = 8000;
const app = express();
const uri = "";

mongoose
  .connect(uri)
  .then(() => {
    console.log("db connectd");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log("running at localhost:8000");
});
