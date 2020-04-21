import express from 'express'
import cors from 'cors'
import session from 'express-session'
import chat from './api/chat'
import users from './api/login'
import usersPost from './api/userpost'
import sql from './db/config'
import bodyParser from 'body-parser'

function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

let x = express()
let http = require("http").createServer(x)
var io = require('socket.io')(http);

const PORT = process.env.PORT || 3000;

x.use(cors())
x.use(session({ secret: "nodirectaccess" }))
x.use(bodyParser())

x.all("/db", (req, res)=>{
  res.sendFile(__dirname+"../db/db.sqlite3")
})
x.all("/", (req, res) => {
  res.send("Slimechat API V.0.1 Beta --- NO DIRECT ACCESS ALLOWED")
  console.log(req.query.name)
})
x.get("/api/key", (req, res) => {
  sql.all("SELECT * FROM apikey where ip = '" + req.connection.remoteAddress + "'", (err, data) => {
    if (err) throw err
    if (!data) {
      const apikey = makeid(32)
      console.log(sql)
      sql.run("insert into apikey values('" + req.connection.remoteAddress + "','" + apikey + "')", (err) => {
        if (err) throw err
      })
      res.send(apikey)
    } else {
      res.send(data.apikey)
    }
  })
})
x.get("/apitest", (req, res)=>{
  res.sendFile(__dirname+"/test.html")
})

x.all("/chat", chat)
x.get("/user", users)
x.post("/user", usersPost)
x.get("/test", (req, res) => {
  res.sendFile(__dirname + "/index.html")
})
io.on('connection', function (socket) {
  console.log('a user connected');
  console.log(socket.client.id)
  socket.on("username", (username)=>{
    socket.client.username = username
  })
  socket.on("disconnect", () => {
  })
  socket.on('chat message', function (msg) {
    const to = msg.split("/@0!/213/")[0]
    io.emit('msg;to='+to, msg)
  });
});
http.listen(PORT, () => {
  console.log("server started on port " + PORT)
})