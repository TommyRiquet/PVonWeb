// This is the entry point for the backend

import exp from "constants";

// Importing the modules
const http = require("http");
require("dotenv").config();
const PORT = process.env.PORT || 3001;

const express = require("express");
const app = express();

//connexion to db
const db = require("./database/db");
db.connect();

const server = http.createServer(app);
const socketIO = require("socket.io");
const cors = require("cors");
const path = require("path");

var cookieParser = require("cookie-parser");
app.use(
  cookieParser(
    process.env.COOKIES_SECRET_KEY
  )
);
app.use(express.urlencoded({ extended: true }));
app.use(cors(
  {
    origin: "http://localhost:3000",
    credentials: true,
  }
));

// Socket.io
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
  path: "/api/socket.io",
});

io.on("connection", (socket: any) => {
  console.log("client connected: ", socket.id);

  socket.on("disconnect", (reason: String) => {
    console.log(reason + ": ", socket.id);
  });
});

app.use(express.json());

const auth = require("./routes/auth");
app.use("/api/auth", auth);

// Path: frontend\src\index.tsx
// This is the entry point for the frontend
app.use(express.static(__dirname + "/build"));
app.get("/*", (_, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

server.listen(PORT, (err: any) => {
  if (err) console.log(err);
  console.log("Server running on Port ", PORT);
});
