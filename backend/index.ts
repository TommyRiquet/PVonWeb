// This is the entry point for the backend

// Importing the modules
const http = require("http");

const express = require("express");
const app = express();

const server = http.createServer(app);
const socketIO = require("socket.io");

const path = require("path");
const PORT = process.env.PORT || 3001;

server.listen(PORT, (err: any) => {
  if (err) console.log(err);
  console.log("Server running on Port ", PORT);
});

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

// Path: frontend\src\index.tsx
// This is the entry point for the frontend
app.use(express.static(__dirname + "/build"));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});
