"use strict"

Object.defineProperty(exports, "__esModule", {
  value: true
})

var _config = require("../db/config")

var _config2 = _interopRequireDefault(_config)

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

var users = function users(req, res) {
  if (req.query.phone) {
    var phone = req.query.phone
    _config2.default.serialize(function () {
      _config2.default.get("SELECT * FROM api_users WHERE phoneNumber=" + phone, function (err, row) {
        if (err || !row) {
          res.send("")
        } else {
          res.send(JSON.stringify(row))
        }
      })
    })
  } else {
    res.send("GET QUERY NOT FOUND")
  }
}

var usersPost = function usersPost(req, res) {}
exports.default = users