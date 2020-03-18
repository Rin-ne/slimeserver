"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var chat = function chat(req, res) {
    if (req.session.login) {
        if (req.body.msg) {
            res.send("impossible");
        } else {
            res.send("impossible");
        }
    } else {
        res.send("\n            <script>\n                window.location.href = \"https://slimeserver.herokuapp.com/login\"\n            </script>\n        ");
    }
};

exports.default = chat;