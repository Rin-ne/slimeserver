"use strict"

Object.defineProperty(exports, "__esModule", {
  value: true
})

var _config = require("../db/config.js")

var _config2 = _interopRequireDefault(_config)

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

var usersPost = function usersPost(req, res) {
  var nomor = req.body.nomor
  var avatar = req.body.avatar
  var frontName = req.body.frontName
  var status = req.body.status
  console.log(nomor)
  var query = "INSERT INTO api_users(phoneNumber, name, avatar, status) VALUES('" + nomor + "', '" + frontName + "', '" + avatar + "', '" + status + "')"
  console.log(query)
  _config2.default.serialize(function () {
    _config2.default.run(query, function (err) {})
  })
}

exports.default = usersPost