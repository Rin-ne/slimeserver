import express from "express"
import cors from "cors"
import session from "express-session"
import usersPost from "./api/userpost"
import bodyParser from "body-parser"
import checkUser from './api/checkuser'
import path from 'path'
import mongodb from 'mongodb'
import fileUpload from 'express-fileupload'
import morgan from 'morgan'
import _ from 'lodash'
import health from 'express-ping'


const MongoClient = mongodb.MongoClient
const uri = "mongodb+srv://SlimeDev:a1s2h3j4a5@cluster0-qnvfk.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  console.log("connected to mongo database")
  // perform actions on the collection object;
  client.close();
});


let x = express()
let http = require("http").createServer(x)
var io = require("socket.io")(http)

const PORT = process.env.PORT || 3000

x.use(cors())
x.use(session({ secret: "nodirectaccess" }))
x.use(bodyParser({ limit: "10mb" }))
x.use(fileUpload({ createParentPath: true }));
x.use(morgan('dev'));
x.use(health.ping())

/**
 * index, not really important tho
 */
x.all("/", (req, res) => {
  res.send("Slimechat API V.0.2 Beta --- NO DIRECT ACCESS ALLOWED")
  console.log(req.query.name)
})

/**
 * Status handler, require api key and name query
 * Only get and post. After certain time the status will be deleted
 */
/**
 * first, status endpoint for status page in apps
 * it expect contactset query
 * return status thumbnail and state
 */
x.get("/status", (req, res)=>{
  let data = req.body.data
  data = JSON.parse(data)
  if (!Array.isArray(data)) res.send("404")

})
/**
 * for specific user status
 * expect name(phone number) and apikey
 * return mp4 for video
 * return mp3 for audio
 */
x.get("/status/:name", (req, res)=>{

})
x.post("/status", (req, res)=>{
  
})
/**
 * img handler. img received from /user post endpoint or daftar activity
 * no apikey is required. but the access will be limited soon.
 */
x.get("/img/:name", (req, res) => {
  const name = req.params.name
  res.sendFile(path.resolve(__dirname + `/../img/${name}.png`))
})

/**
 * User endpoint, for register and get data about user.
 * special query is required
 * 
 * checkuser : [{
 *  phoneNumber: String(parsed)
 *  name: String(optional)
 *  ...Optional value from contact
 * }]
 * 
 * userspost : String(Json stringified from {
 *  nomor : String
 *  avatar : String(base64)
 *  frontName : String
 *  status : String //it should be bio
 * }) 
 *
 */
x.post("/checkUser", checkUser)
x.post("/user", usersPost)
x.get("/test", (req, res) => {
  res.sendFile(__dirname + "/index.html")
})
io.on("connection", function (socket) {
  try {
    console.log("a user connected")
    console.log(socket.client.id)
    socket.on("username", (username) => {
      socket.client.username = username
    })
    socket.on("disconnect", () => {
    })
    socket.on("chat", function (msg) {
      try{

        const data = JSON.parse(msg)
        console.log(msg)
        const d = {
          message: data.msg,
          date: data.date,
          sender: data.sender,
          time: data.time
        }
        socket.broadcast.emit(data.receiver, JSON.stringify(d))
      }catch(e){
        
      }
    })
    socket.on("+6285710251303", (msg) => {
      console.log(msg)
      socket.broadcast.emit("+6285710251303", msg)
    })

  }
  catch (e) {
    console.log(e)
  }
})
http.listen(PORT, () => {
  console.log("server started on port " + PORT)
})
