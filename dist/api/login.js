"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var login = function login(req, res) {
    if (req.session.login) {
        res.send("OK");
    } else {
        if (req.body.userid) {} else {
            res.send("NOT OK");
        }
    }
};

exports.default = login;