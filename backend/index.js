"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

const PORT = 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use(morgan("tiny"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

// endpoints

// app.use(require("./routes/my-routes"));

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log(`🎊 Server is listening on port: ${PORT}`);
});
