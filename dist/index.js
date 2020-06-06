"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _expressSession = require("express-session");

var _expressSession2 = _interopRequireDefault(_expressSession);

var _userpost = require("./api/userpost");

var _userpost2 = _interopRequireDefault(_userpost);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _checkuser = require("./api/checkuser");

var _checkuser2 = _interopRequireDefault(_checkuser);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _mongodb = require("mongodb");

var _mongodb2 = _interopRequireDefault(_mongodb);

var _expressFileupload = require("express-fileupload");

var _expressFileupload2 = _interopRequireDefault(_expressFileupload);

var _morgan = require("morgan");

var _morgan2 = _interopRequireDefault(_morgan);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _multer = require("multer");

var _multer2 = _interopRequireDefault(_multer);

var _expressPing = require("express-ping");

var _expressPing2 = _interopRequireDefault(_expressPing);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _socket = require("socket.io-client");

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SocketNavy = (0, _socket2.default)("http://localhost:4000");

var x = (0, _express2.default)();
var http = require("http").createServer(x);
var ion = require("socket.io")(http, { wsEngine: "ws" });
var PORT = process.env.PORT || 3000;

x.use((0, _cors2.default)());
x.use((0, _expressSession2.default)({ secret: "nodirectaccess" }));
x.use((0, _bodyParser2.default)({ limit: "10mb" }));
x.use(_bodyParser2.default.urlencoded());
x.use(_bodyParser2.default.urlencoded({ extended: true }));
x.use((0, _expressFileupload2.default)({ createParentPath: true }));
x.use((0, _morgan2.default)('dev'));
x.use(_expressPing2.default.ping());
_expressPing2.default.info(function (data) {
  console.log(data);
});

var Storage = _multer2.default.diskStorage({
  destination: function destination(req, file, callback) {
    callback(null, './img');
  },
  filename: function filename(req, file, callback) {
    callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  }
});

var upload = (0, _multer2.default)({ storage: Storage }).single('file');
x.post('/files', function (req, res) {
  upload(req, res, function (err) {
    if (err) console.error(err);
    var file = req.file;
    var meta = req.body;

    console.log(file);
    console.log(meta);
  });
});
/**
 * index, not really important tho
 */
x.all("/", function (req, res) {
  res.send("Slimechat API V.0.2 Beta --- NO DIRECT ACCESS ALLOWED");
  console.log(req.query.name);
});

x.post("/up", function (req, res) {
  var filename = req.body.filename;
  var file = req.body.file;
  var wstream = _fs2.default.createWriteStream(__dirname + "/../img/" + filename, { encoding: 'base64' });
  wstream.write(file);
  wstream.end();
});
x.post("/uploadFile", function (req, res) {
  console.log(req.body);
});
/**
 * Status handler, require api key and name query
 * Only get and post. After certain time the status will be deleted
 */
/**
 * first, status endpoint for status page in apps
 * it expect contactset query
 * return status thumbnail and state
 */
x.get("/status", function (req, res) {
  var data = req.body.data;
  data = JSON.parse(data);
  if (!Array.isArray(data)) res.send("404");
});
/**
 * for specific user status
 * expect name(phone number) and apikey
 * return mp4 for video
 * return mp3 for audio
 */
x.get("/status/:name", function (req, res) {});
x.post("/status", function (req, res) {});
/**
 * img handler. img received from /user post endpoint or daftar activity
 * no apikey is required. but the access will be limited soon.
 */
x.get("/img/:name", function (req, res) {
  var name = req.params.name;
  res.sendFile(_path2.default.resolve(__dirname + ("/../img/" + name + ".png")));
});

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
x.post("/checkUser", _checkuser2.default);
x.post("/user", _userpost2.default);
x.get("/test", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
var numberOFConnectedClient = 0;
var onlineUser = {};
var clientData = {};
x.get("/cn", function (req, res) {
  res.send(numberOFConnectedClient.toString());
});
ion.on("connection", function (socket) {
  numberOFConnectedClient++;
  var bomb = setTimeout(function () {
    if (clientData[socket.id] == undefined) {
      console.log(socket.id + " is kicked");
      socket.disconnect();
    } else {
      console.log("something bad happened");
    }
  }, 30000);
  socket.on("disconnect", function () {
    try {
      numberOFConnectedClient--;
      clientData[socket.id].online = false;
      onlineUser[clientData[socket.id].username] = false;
    } catch (e) {
      console.log("disconnect faily");
    }
  });
  socket.on("username", function (username) {
    clientData[socket.id] = {
      username: username,
      online: true
    };
    onlineUser[username] = clientData[socket.id].online;
    clearTimeout(bomb);
  });
  try {
    console.log("a user connected");

    socket.on("chat", function (msg, callback) {
      console.log(onlineUser);
      msg = JSON.parse(msg);
      console.log(msg.receiver);
      console.log(onlineUser[msg.receiver]);
      if (onlineUser[msg.receiver] == true) {
        try {
          var data = msg;
          console.log(msg);
          var d = {
            message: data.msg,
            date: data.date,
            sender: data.sender,
            time: data.time
          };
          socket.broadcast.emit(data.receiver, JSON.stringify(d));
          callback("delivered");
        } catch (e) {
          console.log("failed to send msg");
          callback("failed");
        }
      } else {
        console.log("forwarded to navy");
        SocketNavy.emit("store this chat please", { type: "object", data: msg });
        callback("sent");
      }
    });
    socket.on("+6285710251303", function (msg) {
      console.log(msg);
      socket.broadcast.emit("+6285710251303", msg);
    });
  } catch (e) {
    console.log(e);
  }
});
http.listen(PORT, function () {
  console.log("server started on port " + PORT);
});