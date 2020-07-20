"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = checkUser;

var _config = require("../db/config");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function checkUser(req, res) {
  var data = req.body.data;
  data = JSON.parse(data);
  if (!Array.isArray(data)) res.send("404");
  var friends = [];
  var test = function test(data) {
    return new Promise(function (res, rej) {
      var x = 0;

      var _loop = function _loop() {
        var el = data[x];
        try {
          var query = "SELECT * FROM api_users WHERE phoneNumber='" + el.number + "'";
          _config2.default.get(query, function (err, row) {
            if (row) {
              friends.forEach(function (le) {
                if (row != null && el != null) {
                  if (row.phoneNumber == le.phoneNumber) {
                    row = null;
                    el = null;
                  }
                }
              });
              friends.push(_extends({}, row, { el: el }));
              x++;
            }
            if (err) throw err;
          });
        } catch (err) {}
        x++;
      };

      while (x != data.length) {
        _loop();
      }
      setTimeout(function () {
        return res("whatever");
      }, 500);
    });
  };
  test(data).then(function () {
    friends.push({
      id: 666,
      phoneNumber: "+6667778889990",
      name: "Slime Indonesia",
      avatar: ".",
      status: "Saya Slime",
      el: {
        name: "Slime Indonesia",
        number: "+6667778889990"
      }
    });
    friends.push({
      id: 57,
      phoneNumber: "+6289517148350",
      name: "Anggita P. Lesmana",
      status: "CEO Slime Indonesia",
      avatar: ".",
      el: {
        name: "Anggita Lesmana",
        number: "+6289517148350"
      }
    });
    res.send(JSON.stringify(friends));
  });
}