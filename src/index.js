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
import multer from 'multer'
import health from 'express-ping'
import fs from 'fs'
import io from 'socket.io-client'

const SocketNavy = io("http://localhost:3000")



const MongoClient = mongodb.MongoClient
const uri = "mongodb+srv://SlimeDev:a1s2h3j4a5@cluster0-qnvfk.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  console.log("connected to mongo database")
  // perform actions on the collection object;;
  client.close();
});


let x = express()
let http = require("http").createServer(x)
var ion = require("socket.io")(http)
const PORT = process.env.PORT || 3000

x.use(cors())
x.use(session({ secret: "nodirectaccess" }))
x.use(bodyParser({ limit: "10mb" }))
x.use(bodyParser.urlencoded());
x.use(bodyParser.urlencoded({ extended: true }));
x.use(fileUpload({ createParentPath: true }));
x.use(morgan('dev'));
x.use(health.ping());
health.info((data) => { console.log(data) })


const Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './img')
  },
  filename: function (req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`)
  },
})

const upload = multer({ storage: Storage }).single('file')
x.post('/files', (req, res) => {
  upload(req, res, err => {
    if (err) console.error(err)
    const file = req.file
    const meta = req.body

    console.log(file)
    console.log(meta)
  })
})
/**
 * index, not really important tho
 */
x.all("/", (req, res) => {
  res.send("Slimechat API V.0.2 Beta --- NO DIRECT ACCESS ALLOWED")
  console.log(req.query.name)
})

x.post("/up", (req, res) => {
  const filename = req.body.filename
  const file = req.body.file
  var wstream = fs.createWriteStream(__dirname + "/../img/" + filename, { encoding: 'base64' });
  wstream.write(file);
  wstream.end();
})
x.post("/uploadFile", (req, res) => {
  console.log(req.body)
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
x.get("/status", (req, res) => {
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
x.get("/status/:name", (req, res) => {

})
x.post("/status", (req, res) => {

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
 *  status : String //it should be bion
 * }) 
 *
 */
x.post("/checkUser", checkUser)
x.post("/user", usersPost)
x.get("/test", (req, res) => {
  res.sendFile(__dirname + "/index.html")
})
let numberOFConnectedClient = 0
let onlineUser = {}
let clientData = {}
x.get("/cn", (req, res) => {
  res.send(numberOFConnectedClient.toString())
})
ion.on("connection", function (socket) {
  numberOFConnectedClient++
  setTimeout(()=>{
    if(clientData[socket.id] == undefined){
      socket.disconnect()
    }
  }, 10000)
  socket.on("disconnect", () => {
    try{
      numberOFConnectedClient--
      clientData[socket.id].online = false
      onlineUser[clientData[socket.id].username] = false
    }catch(e){
      console.log("disconnect faily")
    }
  })
  socket.on("username", (username) => {
    clientData[socket.id] = {
      username: username,
      online: true
    }
    onlineUser[username] = clientData[socket.id].online
  })
  try {
    console.log("a user connected")
    socket.on("username", (username) => {
      socket.client.username = username
    })
    socket.on("disconnect", () => {
    })
    socket.on("chat", function (msg) {
      console.log(onlineUser)
      if (onlineUser[msg.receiver] == true) {
        try {
          const data = JSON.parse(msg)
          console.log(msg)
          const d = {
            message: data.msg,
            date: data.date,
            sender: data.sender,
            time: data.time
          }
          socket.broadcast.emit(data.receiver, JSON.stringify(d))
        } catch (e) {
          console.log("failed to send msg")
        }
      }
      else{
        console.log("forwarded to navy")
        SocketNavy.emit("store this chat please", {type:"object", data:msg})
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
