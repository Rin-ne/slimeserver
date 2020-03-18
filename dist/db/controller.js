"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = function db(req, res) {
    _config2.default.serialize(function () {
        var query = req.body.query;
        console.log(query);
        _config2.default.run(query, function (err) {
            if (err) throw err;
            console.log("query done");
        });
    });
};

exports.default = db;