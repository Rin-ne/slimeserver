import express from "express"
import cors from "cors"
import session, { Store } from "express-session"
import usersPost from "./api/userpost"
import bodyParser from "body-parser"
import checkUser from './api/checkuser'
import path from 'path'
import fileUpload from 'express-fileupload'
import morgan from 'morgan'
import multer from 'multer'
import health from 'express-ping'
import fs from 'fs'
import fetch from 'node-fetch'
import storage from "node-persist"
import io from 'socket.io-client'
import sql from './db/config'
import { TransactionDatabase } from 'sqlite3-transactions'
import * as admin from 'firebase-admin'
const conf = require("../project1-be14c-firebase-adminsdk-rauno-946539cde6.json")
let tokens = {}
storage.init().then(() => {
  storage.getItem("tokens").then((tokenss) => {
    if(tokenss === undefined){
      console.log("empty tokens")
      return
    }
    console.log(tokenss)
    tokens = JSON.parse(tokenss)
  })
})


const setTokens = (nomor, token) => {
  try{

    tokens[nomor] = token
    storage.setItem("tokens", JSON.stringify(tokens))
    console.log(tokens)
  }catch(e){
    console.log("something wrong happened, or token is already in server")
  }
}
const db = new TransactionDatabase(sql)
db.beginTransaction((err, tx) => {
  tx.run(`CREATE TABLE IF NOT EXISTS groups(
    id	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
    name TEXT NOT NULL,
    admin TEXT NOT NULL,
    dateCreated TEXT NOT NULL,
    description TEXT NOT NULL,
    profilPictures TEXT NOT NULL,
    members TEXT NOT NULL
  )`)
   tx.run(`CREATE TABLE IF NOT EXISTS stickers(
    id	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
    name TEXT NOT NULL,
    creator TEXT NOT NULL,
    dateCreated TEXT NOT NULL,
    description TEXT NOT NULL,
    stickers TEXT NOT NULL,
    packs TEXT NOT NULL
  )`)

  tx.commit((err) => {
    if (err) return console.log(err)
    console.log("hippity hoppity your code is now my property")
  })
})

const getGroupInfo = async()=>{
  return sql.serialize(()=>{
    return sql.all(`SELECT * FROM groups`, [], (err, rows)=>{
      return rows
    })
  })
}
admin.initializeApp({
  credential: admin.credential.cert(conf),
  databaseURL: "https://project1-be14c.firebaseio.com"

})
db.serialize(() => {
  db.run
})

const server = {
  "azure": "http://sl-azure.herokuapp.com",
  "crimson": "http://sl-crimson.herokuapp.com",
  "firebrick": "http://sl-firebrick.herokuapp.com",
  "magenta": "http://sl-magenta.herokuapp.com",
  "navy": "http://sl-navy.herokuapp.com",
  "linen": "http://sl-linen.herokuapp.com",
  "thistle": "http://sl-thistle.herokuapp.com",
  "aliceblue": "http://sl-aliceblue.herokuapp.com",
  "sienna": "http://sl-sienna.herokuapp.com",
  "ivory": "http://sl-ivory.herokuapp.com"
}
const ServerSockets = {
  navy: io(server["navy"]),
  azure: io(server["azure"]),
  crimson: io(server["crimson"]),
  firebrick: io(server["firebrick"]),
  magenta: io(server["magenta"])
}
/*


 */
let pushNotifTokens = {}
const alfabet = ["a", "2", "e", "1", "f", "4", "d", "5", "c", "6", "a", "9", "d", "0", "b", "3", "6", "c", "8", "c", "4", "c", "1", "b", "a", "5", "e", "3", "1", "5", "6", "7", "1", "4", "5", "b", "e", "f", "f", "f", "1", "3", "4", "7", "9", "a", "e", "1", "d", "b", "2", "6", "b", "7", "7"]
let users = {

}
setInterval(() => {
  const time = `${new Date().getFullYear() * new Date().getSeconds()}${new Date().getDate() * new Date().getSeconds()}${new Date().getHours() * new Date().getSeconds()}${new Date().getMinutes() * new Date().getSeconds()}${new Date().getSeconds() * new Date().getSeconds()}`
  let token = ""
  time.split("").forEach(t => {
    token = token + alfabet[t]
  })
  fetch(server["aliceblue"] + "/user?token=" + token)
    .then((data) => data.json())
    .then(data => {
      users = data
    })
    .catch(e => { })
}, 10)
let x = express()
let http = require("http").createServer(x)
let ion = require("socket.io")(http, { wsEngine: "ws" })
const PORT = process.env.PORT || 7002

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
x.get("/sendToken", (req, res) => {
  let token, nomor
  try {
    token = req.query.token
    nomor = req.query.nomor
  } catch (e) {
    res.send("Wrong Query")
  }
  setTokens(nomor, token)
  res.send("ok")
})
x.post("/addSticker", (req, res) => {
  if(req.body.nomor === undefined) return res.send("wrong query")
  if(req.body.name === undefined) return res.send("wrong query")
  if(req.body.sticker === undefined) return res.send("wrong query")
  if(req.body.publish === undefined) return res.send("wrong query")
  if(req.body.name === undefined) return res.send("wrong query")
 // add sticker to host and send ok response 

})
x.get("/sticker/:id", (req, res) => {
  
})
x.get("/sendNotif", (req, res) => {
  try {
    let nomor
    nomor = req.query.nomor
    console.log(tokens[nomor])
    admin.messaging().sendToDevice(
      tokens[nomor],
      {
        data: {
          nomor: nomor
        },
      },
      {
        // Required for background/quit data-only messages on iOS
        contentAvailable: true,
        // Required for background/quit data-only messages on Android
        priority: 'high',
      },
    ).then(()=>{
      res.send("ok")
    })
  } catch (e) {
    console.log(e)
    return res.send("Wrong Query")
  }
})

x.all("/", (req, res) => {
  res.send("Slimechat API V.0.2 Beta --- NO DIRECT ACCESS ALLOWED")
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
const dn = ()=>{}
x.post("/group", (req, res)=>{
  if(
    req.body.name === undefined||
    req.body.admin === undefined||
    req.body.profilePhoto === undefined||
    req.body.members === undefined||
    req.body.description === undefined
  ){
    return res.send("Wrong Query")
  }
  if(typeof req.body.admin == "string"){
    req.body.admin = JSON.parse(req.body.admin)
  }
  const name = req.body.name,
        admin = req.body.admin,
        profilePhoto = req.body.profilePhoto,
        members = req.body.members,
        description = req.body.description,
        d = new Date(),
        createdDate = d.getUTCFullYear() + "-" + d.getUTCMonth() + "-" + d.getUTCDate() + " " + d.getUTCHours() + ":" + d.getUTCMinutes() + ":" + d.getUTCSeconds()
  var wstream = fs.createWriteStream(__dirname + "/../img/" + admin[0] + "@" + name+".png", { encoding: 'base64' });
  wstream.write(profilePhoto);
  wstream.end();
  console.log(`INSERT INTO groups(name, admin, dateCreated, description, profilPictures, members)
  VALUES("${name.split("\"").join("\"\"")}", "${JSON.stringify(admin)}", "${createdDate}", "${description.split(`"`).join(`""`)}", "${admin[0]+"@"+name}", "${JSON.stringify(members).split(`"`).join(`""`)}" )
`)
  db.beginTransaction((err, tx)=>{
    tx.run(`INSERT INTO groups(name, admin, dateCreated, description, profilPictures, members)
      VALUES('${name.split("'").join(`"`)}', '${JSON.stringify(admin)}', '${createdDate}', '${description.split(`'`).join(`"`)}', '${admin[0]+"@"+name.split("'").join(`"`)}', '${JSON.stringify(members)}' )
    `)
    tx.commit((e)=>{if(e) console.error(e);else{res.send("ok")}})
  })
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

x.get("/pushNotif", (req, res) => {
  const token = req.params.token
  const nomor = req.params.nomor
  pushNotifTokens[nomor] = token
  console.log(pushNotifTokens)
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
  const bomb = setTimeout(() => {
    if (onlineUser[socket.id] === undefined) {
      console.log(`${socket.id} is kicked`)
      socket.disconnect()
    } else {
      console.log("something bad happened")
    }
  }, 30000)
  socket.on("disconnect", () => {
    try {
      numberOFConnectedClient--
      clientData[socket.id].online = false
      onlineUser[clientData[socket.id].username] = false
      console.log(clientData[socket.id].username + " is disconnected")
    } catch (e) {
      console.log("disconnect faily")
    }
  })
  socket.on("username", (username) => {
    clientData[socket.id] = {
      username: username,
      online: true
    }
    onlineUser[username] = clientData[socket.id].online
    console.log(username + " connected")
    clearTimeout(bomb)
  })
  try {
    console.log("a user connected")
    socket.on("chat", function (data, callback) {
      if(data.type !== undefined && data.type === "group"){
        try {
          const msg = JSON.parse(data)
          console.log(msg.receiver)
          console.log(onlineUser[msg.receiver])
          if (onlineUser[msg.receiver] === true) {
            const data = msg
            console.log(msg)
            const d = {
              message: data.message,
              date: data.date,
              sender: data.sender,
              time: data.time
            }
            socket.broadcast.emit(data.receiver, JSON.stringify(d))
            callback("delivered")
          }
          else {
            if (users[msg.receiver] !== undefined) {
              switch (users[msg.receiver]) {
                case server["azure"]:
                  ServerSockets.azure.emit("chat", data)
                  break
                case server["firebrick"]:
                  ServerSockets.firebrick.emit("chat", data)
                  break
                case server["crimson"]:
                  ServerSockets.crimson.emit("chat", data)
                  break
                case server["magenta"]:
                  ServerSockets.magenta.emit("chat", data)
                  break
                default:
                  break;
              }
            }
            console.log("forwarded to navy")
            ServerSockets.navy.emit("store this chat please", { type: "object", data: msg })
            callback("sent")
          }
        } catch (e) {
          console.log("failed to send msg\nproblem : " + e)
          try {
            callback("failed")
          } catch (e) { }
        }
      }
      console.log(onlineUser)
      try {
        const msg = JSON.parse(data)
        console.log(msg.receiver)
        console.log(onlineUser[msg.receiver])
        console.log(tokens[msg.receiver])
        if(tokens[msg.receiver] !== undefined){
          console.log("token isn't null")
          admin.messaging().sendToDevice(tokens[msg.receiver], {
            notification:{
              title:msg.sender,
              body:msg.message
            },
            data:{
              msg: JSON.stringify({
                message: msg.message,
                date: msg.date,
                sender: msg.sender,
                time: msg.time
              })
            }
          })
        }
        if (onlineUser[msg.receiver] === true) {
          const data = msg
          console.log(msg)
          const d = {
            message: data.message,
            date: data.date,
            sender: data.sender,
            time: data.time
          }
          socket.broadcast.emit(data.receiver, JSON.stringify(d))
          callback("delivered")
        }
        else {
          if (users[msg.receiver] !== undefined) {
            switch (users[msg.receiver]) {
              case server["azure"]:
                ServerSockets.azure.emit("chat", data)
                break
              case server["firebrick"]:
                ServerSockets.firebrick.emit("chat", data)
                break
              case server["crimson"]:
                ServerSockets.crimson.emit("chat", data)
                break
              case server["magenta"]:
                ServerSockets.magenta.emit("chat", data)
                break
              default:
                break;
            }
          }
          console.log("forwarded to navy")
          ServerSockets.navy.emit("store this chat please", { type: "object", data: msg })
          callback("sent")
        }
      } catch (e) {
        console.log("failed to send msg\nproblem : " + e)
        try {
          callback("failed")
        } catch (e) { }
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
