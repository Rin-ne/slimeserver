"use strict"

var _express = require("express")

var _express2 = _interopRequireDefault(_express)

var _cors = require("cors")

var _cors2 = _interopRequireDefault(_cors)

var _expressSession = require("express-session")

var _expressSession2 = _interopRequireDefault(_expressSession)

var _chat = require("./api/chat")

var _chat2 = _interopRequireDefault(_chat)

var _login = require("./api/login")

var _login2 = _interopRequireDefault(_login)

var _userpost = require("./api/userpost")

var _userpost2 = _interopRequireDefault(_userpost)

var _config = require("./db/config")

var _config2 = _interopRequireDefault(_config)

var _bodyParser = require("body-parser")

var _bodyParser2 = _interopRequireDefault(_bodyParser)

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

function makeid(length) {
  var result = ""
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  var charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

var x = (0, _express2.default)()
var http = require("http").createServer(x)
var io = require("socket.io")(http)

var PORT = process.env.PORT || 3000

x.use((0, _cors2.default)())
x.use((0, _expressSession2.default)({ secret: "nodirectaccess" }))
x.use((0, _bodyParser2.default)())

x.all("/", function (req, res) {
  res.send("Slimechat API V.0.1 Beta --- NO DIRECT ACCESS ALLOWED")
  console.log(req.query.name)
})
x.get("/api/key", function (req, res) {
  _config2.default.all("SELECT * FROM apikey where ip = '" + req.connection.remoteAddress + "'", function (err, data) {
    if (err) throw err
    if (!data) {
      var apikey = makeid(32)
      console.log(_config2.default)
      _config2.default.run("insert into apikey values('" + req.connection.remoteAddress + "','" + apikey + "')", function (err) {
        if (err) throw err
      })
      res.send(apikey)
    } else {
      res.send(data.apikey)
    }
  })
})
x.get("/apitest", function (req, res) {
  res.sendFile(__dirname + "/test.html")
})

x.all("/chat", _chat2.default)
x.get("/user", _login2.default)
x.post("/user", _userpost2.default)
x.get("/test", function (req, res) {
  res.sendFile(__dirname + "/index.html")
})
io.on("connection", function (socket) {
  console.log("a user connected")
  console.log(socket.client.id)
  socket.on("username", function (username) {
    socket.client.username = username
  })
  socket.on("disconnect", function () {})
  socket.on("chat message", function (msg) {
    var to = msg.split("/@0!/213/")[0]
    io.emit("msg;to=" + to, msg)
  })
})
http.listen(PORT, function () {
  console.log("server started on port " + PORT)
})