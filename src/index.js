import express from 'express'
import cors from 'cors'
import session from 'express-session'
import chat from './api/chat'
import login from './api/login'
import admin from './admin/main'

let x = express()
let http = require("http").createServer(x)
var io = require('socket.io')(http);

const PORT = process.env.PORT || 80;

x.use(cors())
x.use(session({ secret : "nodirectaccess" }))

x.all("/", (req, res)=>{
    res.send("Slimechat API V.0.1 Beta --- NO DIRECT ACCESS ALLOWED")
    console.log(req.query.name)
})
x.all("/chat", chat)
x.get("/login", login)
x.get("/admin", admin)
x.get("/test", (req, res)=>{
  res.sendFile(__dirname + "/index.html")
})
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on("disconnect", ()=>{
    console.log("user mati")
  })
  socket.on('chat message', function(msg){
    io.emit('msg', msg)
  });
});
http.listen(PORT, ()=>{
    console.log("server started on port " + PORT)
})