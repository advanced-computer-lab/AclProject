const express = require("express");
const r = express.Router();
const Flight = require("./Flight");

r.get("/", (req, res) => {
  Flight.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

r.post("/", (req, res) => {
  Flight.find({ num: req.body.num })
    .then((data) => {
      let f = Flight(req.body);
      Flight.collection.insertOne(f);
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

r.patch("/", (req, res) => {
  Flight.find({ num: parseInt(req.body.num) }).then((data) => {
    Flight.collection
      .updateOne({ num: req.body.num }, { $set: req.body })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.send(err);
      });
  });
});

r.delete("/", (req, res) => {
  Flight.find({ num: req.body.num }).then((data) => {
    Flight.collection
      .deleteOne({ num: req.body.num })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.send(err);
      });
  });
});

module.exports = r;
