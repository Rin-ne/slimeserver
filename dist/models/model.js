"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _config = require("../db/config");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var orm = {
    get: function get(table) {
        var column = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "*";
        var where = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "id = 0 OR 1 = 1";

        var query = "SELECT " + column + " FROM " + table + " WHERE " + where;
        var pass = {
            val: "",
            set: function set(val) {
                this.val = val;
            }
        };
        _config2.default.serialize(function () {
            _config2.default.all(query, function (err, rows) {
                if (err) throw err;
                pass.set(rows);
            });
        });
        return pass.val;
    },
    set: function set(table) {
        var column = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "*";
        var where = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "id = 0 OR 1 = 1";
    },
    new: function _new(table, value) {
        var column = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

        if (column) column = "(" + column + ")";
        value = "(" + value + ")";
        var query = "INSERT INTO " + table + column + " VALUES" + value;
        _config2.default.serialize(function () {
            _config2.default.run(query, function (err) {
                if (err) throw err;
            });
        });
    }
};

exports.default = orm;