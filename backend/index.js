"use strict";
const mysqlConnection = require("./mysql");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const PORT = 8080;
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("tiny"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// SOCKET ********

io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected !`);
  socket.emit("your ID", socket.id);

  socket.on("send message", (data) => {
    io.emit("send message", data);
    const sql = "INSERT INTO users (name, post, email, date) VALUES (?,?,?,?)";
    const { name, post, email, date } = data;
    mysqlConnection.query(sql, [name, post, email, date], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        return result;
      }
    });
  });

  socket.on("disconnect", () => {
    console.log(`Client ${socket.id} disconnected`);
  });
});

app.use(require("./routes/routes"));

app.get("/", (req, res) => {
  res.send("Hello");
});

http.listen(PORT, () => {
  console.log(`🎊 Server is listening on port: ${PORT}`);
});
