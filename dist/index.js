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

var _expressFileupload = require("express-fileupload");

var _expressFileupload2 = _interopRequireDefault(_expressFileupload);

var _morgan = require("morgan");

var _morgan2 = _interopRequireDefault(_morgan);

var _multer = require("multer");

var _multer2 = _interopRequireDefault(_multer);

var _expressPing = require("express-ping");

var _expressPing2 = _interopRequireDefault(_expressPing);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _nodeFetch = require("node-fetch");

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _nodePersist = require("node-persist");

var _nodePersist2 = _interopRequireDefault(_nodePersist);

var _socket = require("socket.io-client");

var _socket2 = _interopRequireDefault(_socket);

var _config = require("./db/config");

var _config2 = _interopRequireDefault(_config);

var _sqlite3Transactions = require("sqlite3-transactions");

var _firebaseAdmin = require("firebase-admin");

var admin = _interopRequireWildcard(_firebaseAdmin);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var conf = require("../project1-be14c-firebase-adminsdk-rauno-946539cde6.json");
var tokens = {};
require("babel-polyfill");
_nodePersist2.default.init().then(function () {
  _nodePersist2.default.getItem("tokens").then(function (tokenss) {
    if (tokenss === undefined) {
      console.log("empty tokens");
      return;
    }
    console.log(tokenss);
    tokens = JSON.parse(tokenss);
  });
});

var setTokens = function setTokens(nomor, token) {
  try {

    tokens[nomor] = token;
    _nodePersist2.default.setItem("tokens", JSON.stringify(tokens));
    console.log(tokens);
  } catch (e) {
    console.log("something wrong happened, or token is already in server");
  }
};
var db = new _sqlite3Transactions.TransactionDatabase(_config2.default);
db.beginTransaction(function (err, tx) {
  tx.run("CREATE TABLE IF NOT EXISTS groups(\n    id\tINTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,\n    name TEXT NOT NULL,\n    admin TEXT NOT NULL,\n    dateCreated TEXT NOT NULL,\n    description TEXT NOT NULL,\n    profilPictures TEXT NOT NULL,\n    members TEXT NOT NULL\n  )");
  tx.run("CREATE TABLE IF NOT EXISTS stickers(\n    id\tINTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,\n    name TEXT NOT NULL,\n    creator TEXT NOT NULL,\n    dateCreated TEXT NOT NULL,\n    description TEXT NOT NULL,\n    stickers TEXT NOT NULL,\n    packs TEXT NOT NULL\n  )");

  tx.commit(function (err) {
    if (err) return console.log(err);
    console.log("hippity hoppity your code is now my property");
  });
});

var getGroupInfo = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", _config2.default.serialize(function () {
              return _config2.default.all("SELECT * FROM groups", [], function (err, rows) {
                return rows;
              });
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getGroupInfo() {
    return _ref.apply(this, arguments);
  };
}();
admin.initializeApp({
  credential: admin.credential.cert(conf),
  databaseURL: "https://project1-be14c.firebaseio.com"

});
db.serialize(function () {
  db.run;
});

var server = {
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
};
var ServerSockets = {
  navy: (0, _socket2.default)(server["navy"]),
  azure: (0, _socket2.default)(server["azure"]),
  crimson: (0, _socket2.default)(server["crimson"]),
  firebrick: (0, _socket2.default)(server["firebrick"]),
  magenta: (0, _socket2.default)(server["magenta"])
  /*
  
  
   */
};var pushNotifTokens = {};
var alfabet = ["a", "2", "e", "1", "f", "4", "d", "5", "c", "6", "a", "9", "d", "0", "b", "3", "6", "c", "8", "c", "4", "c", "1", "b", "a", "5", "e", "3", "1", "5", "6", "7", "1", "4", "5", "b", "e", "f", "f", "f", "1", "3", "4", "7", "9", "a", "e", "1", "d", "b", "2", "6", "b", "7", "7"];
var users = {};
setInterval(function () {
  var time = "" + new Date().getFullYear() * new Date().getSeconds() + new Date().getDate() * new Date().getSeconds() + new Date().getHours() * new Date().getSeconds() + new Date().getMinutes() * new Date().getSeconds() + new Date().getSeconds() * new Date().getSeconds();
  var token = "";
  time.split("").forEach(function (t) {
    token = token + alfabet[t];
  });
  (0, _nodeFetch2.default)(server["aliceblue"] + "/user?token=" + token).then(function (data) {
    return data.json();
  }).then(function (data) {
    users = data;
  }).catch(function (e) {});
}, 10);
var x = (0, _express2.default)();
var http = require("http").createServer(x);
var ion = require("socket.io")(http, { wsEngine: "ws" });
var PORT = process.env.PORT || 7002;

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
x.get("/sendToken", function (req, res) {
  var token = void 0,
      nomor = void 0;
  try {
    token = req.query.token;
    nomor = req.query.nomor;
  } catch (e) {
    res.send("Wrong Query");
  }
  setTokens(nomor, token);
  res.send("ok");
});
x.post("/addSticker", function (req, res) {
  if (req.body.nomor === undefined) return res.send("wrong query");
  if (req.body.name === undefined) return res.send("wrong query");
  if (req.body.sticker === undefined) return res.send("wrong query");
  if (req.body.publish === undefined) return res.send("wrong query");
  if (req.body.name === undefined) return res.send("wrong query");
  // add sticker to host and send ok response 
});
x.get("/sticker/:id", function (req, res) {});
x.get("/sendNotif", function (req, res) {
  try {
    var nomor = void 0;
    nomor = req.query.nomor;
    console.log(tokens[nomor]);
    admin.messaging().sendToDevice(tokens[nomor], {
      data: {
        nomor: nomor
      }
    }, {
      // Required for background/quit data-only messages on iOS
      contentAvailable: true,
      // Required for background/quit data-only messages on Android
      priority: 'high'
    }).then(function () {
      res.send("ok");
    });
  } catch (e) {
    console.log(e);
    return res.send("Wrong Query");
  }
});

x.all("/", function (req, res) {
  res.send("Slimechat API V.0.2 Beta --- NO DIRECT ACCESS ALLOWED");
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
var dn = function dn() {};
x.post("/group", function (req, res) {
  if (req.body.name === undefined || req.body.admin === undefined || req.body.profilePhoto === undefined || req.body.members === undefined || req.body.description === undefined) {
    return res.send("Wrong Query");
  }
  if (typeof req.body.admin == "string") {
    req.body.admin = JSON.parse(req.body.admin);
  }
  var name = req.body.name,
      admin = req.body.admin,
      profilePhoto = req.body.profilePhoto,
      members = req.body.members,
      description = req.body.description,
      d = new Date(),
      createdDate = d.getUTCFullYear() + "-" + d.getUTCMonth() + "-" + d.getUTCDate() + " " + d.getUTCHours() + ":" + d.getUTCMinutes() + ":" + d.getUTCSeconds();
  var wstream = _fs2.default.createWriteStream(__dirname + "/../img/" + admin[0] + "@" + name + ".png", { encoding: 'base64' });
  wstream.write(profilePhoto);
  wstream.end();
  console.log("INSERT INTO groups(name, admin, dateCreated, description, profilPictures, members)\n  VALUES(\"" + name.split("\"").join("\"\"") + "\", \"" + JSON.stringify(admin) + "\", \"" + createdDate + "\", \"" + description.split("\"").join("\"\"") + "\", \"" + (admin[0] + "@" + name) + "\", \"" + JSON.stringify(members).split("\"").join("\"\"") + "\" )\n");
  db.beginTransaction(function (err, tx) {
    tx.run("INSERT INTO groups(name, admin, dateCreated, description, profilPictures, members)\n      VALUES('" + name.split("'").join("\"") + "', '" + JSON.stringify(admin) + "', '" + createdDate + "', '" + description.split("'").join("\"") + "', '" + (admin[0] + "@" + name.split("'").join("\"")) + "', '" + JSON.stringify(members) + "' )\n    ");
    tx.commit(function (e) {
      if (e) console.error(e);else {
        res.send("ok");
      }
    });
  });
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

x.get("/pushNotif", function (req, res) {
  var token = req.params.token;
  var nomor = req.params.nomor;
  pushNotifTokens[nomor] = token;
  console.log(pushNotifTokens);
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
    if (onlineUser[socket.id] === undefined) {
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
      console.log(clientData[socket.id].username + " is disconnected");
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
    console.log(username + " connected");
    clearTimeout(bomb);
  });
  try {
    console.log("a user connected");
    socket.on("chat", function (data, callback) {
      if (data.type !== undefined && data.type === "group") {
        try {
          var msg = JSON.parse(data);
          console.log(msg.receiver);
          console.log(onlineUser[msg.receiver]);
          if (onlineUser[msg.receiver] === true) {
            var _data = msg;
            console.log(msg);
            var d = {
              message: _data.message,
              date: _data.date,
              sender: _data.sender,
              time: _data.time
            };
            socket.broadcast.emit(_data.receiver, JSON.stringify(d));
            callback("delivered");
          } else {
            if (users[msg.receiver] !== undefined) {
              switch (users[msg.receiver]) {
                case server["azure"]:
                  ServerSockets.azure.emit("chat", data);
                  break;
                case server["firebrick"]:
                  ServerSockets.firebrick.emit("chat", data);
                  break;
                case server["crimson"]:
                  ServerSockets.crimson.emit("chat", data);
                  break;
                case server["magenta"]:
                  ServerSockets.magenta.emit("chat", data);
                  break;
                default:
                  break;
              }
            }
            console.log("forwarded to navy");
            ServerSockets.navy.emit("store this chat please", { type: "object", data: msg });
            callback("sent");
          }
        } catch (e) {
          console.log("failed to send msg\nproblem : " + e);
          try {
            callback("failed");
          } catch (e) {}
        }
      }
      console.log(onlineUser);
      try {
        var _msg = JSON.parse(data);
        console.log(_msg.receiver);
        console.log(onlineUser[_msg.receiver]);
        console.log(tokens[_msg.receiver]);
        if (tokens[_msg.receiver] !== undefined) {
          console.log("token isn't null");
          admin.messaging().sendToDevice(tokens[_msg.receiver], {
            notification: {
              title: _msg.sender,
              body: _msg.message
            },
            data: {
              msg: JSON.stringify({
                message: _msg.message,
                date: _msg.date,
                sender: _msg.sender,
                time: _msg.time
              })
            }
          });
        }
        if (onlineUser[_msg.receiver] === true) {
          var _data2 = _msg;
          console.log(_msg);
          var _d = {
            message: _data2.message,
            date: _data2.date,
            sender: _data2.sender,
            time: _data2.time
          };
          socket.broadcast.emit(_data2.receiver, JSON.stringify(_d));
          callback("delivered");
        } else {
          if (users[_msg.receiver] !== undefined) {
            switch (users[_msg.receiver]) {
              case server["azure"]:
                ServerSockets.azure.emit("chat", data);
                break;
              case server["firebrick"]:
                ServerSockets.firebrick.emit("chat", data);
                break;
              case server["crimson"]:
                ServerSockets.crimson.emit("chat", data);
                break;
              case server["magenta"]:
                ServerSockets.magenta.emit("chat", data);
                break;
              default:
                break;
            }
          }
          console.log("forwarded to navy");
          ServerSockets.navy.emit("store this chat please", { type: "object", data: _msg });
          callback("sent");
        }
      } catch (e) {
        console.log("failed to send msg\nproblem : " + e);
        try {
          callback("failed");
        } catch (e) {}
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