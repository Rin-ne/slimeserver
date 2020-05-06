import express from "express"
import cors from "cors"
import session from "express-session"
import usersPost from "./api/userpost"
import bodyParser from "body-parser"
import checkUser from './api/checkuser'
import path from 'path'

let x = express()
let http = require("http").createServer(x)
var io = require("socket.io")(http)

const PORT = process.env.PORT || 3000

x.use(cors())
x.use(session({ secret: "nodirectaccess" }))
x.use(bodyParser({limit:"10mb"}))

x.all("/", (req, res) => {
  res.send("Slimechat API V.0.2 Beta --- NO DIRECT ACCESS ALLOWED")
  console.log(req.query.name)
})
x.get("/img/:name", (req, res)=>{
  const name = req.params.name
  res.sendFile(path.resolve(__dirname+`/../img/${name}.png`))
})
x.post("/checkUser", checkUser)
x.post("/user", usersPost)
io.on("connection", function (socket) {
  console.log("a user connected")
  console.log(socket.client.id)
  socket.on("username", (username)=>{
    socket.client.username = username
  })
  socket.on("disconnect", () => {
  })
  socket.on("chat", function (msg) {
    const data = JSON.parse(msg)
    console.log(msg)
    const d = {
      message : data.msg,
      date : data.date,
      sender : data.sender
    }
    socket.emit(data.receiver.phoneNumber, JSON.stringify(d))
  })
})
http.listen(PORT, () => {
  console.log("server started on port " + PORT)
})
