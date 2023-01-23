const express = require("express")
const socketIo = require("socket.io")
const http = require("http")
const PORT = process.env.PORT || 3001
const app = express()
const server = http.createServer(app)

const io = socketIo(server,{ 
    cors: {
      origin: "http://localhost:3000"
    }
}) //in case server and client run on different urls

io.on("connection",(socket : any)=>{
  console.log("client connected: ",socket.id)
  
  socket.on("disconnect",(reason : String)=>{
    console.log(reason+": ",socket.id)
  })
})


server.listen(PORT, (err : any)=> {
  if(err) console.log(err)
  console.log("Server running on Port ", PORT)
})