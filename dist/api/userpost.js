"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require("../db/config.js");

var _config2 = _interopRequireDefault(_config);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var usersPost = function usersPost(req, res) {
  var nomor = req.body.nomor;
  var avatar = req.body.avatar;
  var frontName = req.body.frontName;
  var status = req.body.status;
  console.log(avatar);
  _fs2.default.writeFile(__dirname + "/../../img/" + nomor + ".png", avatar, { encoding: "base64" }, function (err) {
    console.log("File created");
  });
  _fs2.default.writeFile(__dirname + "/../../img/" + nomor + ".txt", avatar, function () {});
  console.log(nomor);
  var query = "INSERT INTO api_users(phoneNumber, name, avatar, status) VALUES('" + nomor + "', '" + frontName + "', '" + __dirname + "/../../img/" + nomor + ".png" + "', '" + status + "')";
  console.log(query);
  _config2.default.run(query, function (err) {
    if (err) throw err;
    res.send("User Created");
  });
};

exports.default = usersPost;