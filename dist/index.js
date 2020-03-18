'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _chat = require('./api/chat');

var _chat2 = _interopRequireDefault(_chat);

var _controller = require('./db/controller');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var x = (0, _express2.default)();

var PORT = process.env.PORT || 3000;

x.use((0, _cors2.default)());
x.use(_bodyParser2.default.json());
x.use(_bodyParser2.default.urlencoded({ extended: true }));
x.use((0, _expressSession2.default)({ secret: "nodirectaccess" }));

x.all("/", function (req, res) {
    res.send("Slimechat API V.0.1 Beta --- NO DIRECT ACCESS ALLOWED");
    if (req.body.test) {
        res.send(req.body.test);
    }
});
x.all("/chat", _chat2.default);
x.all("/db", _controller2.default);
x.listen(PORT, function () {
    console.log("server started on port" + PORT);
});