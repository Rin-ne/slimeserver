"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sqlite = require("sqlite3");

var _sqlite2 = _interopRequireDefault(_sqlite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DB = __dirname + "/../../db/db.sqlite3";
var sql = new _sqlite2.default.Database(DB, _sqlite2.default.OPEN_READWRITE, function (err) {
  if (err) throw err;
  console.log("Connected to database");
});
exports.default = sql;