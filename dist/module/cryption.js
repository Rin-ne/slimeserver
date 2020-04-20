'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var encrypti = function encrypti(text, key) {
    var IV_LENGTH = 16;
    var ENCRYPTION_KEY = key;
    var iv = _crypto2.default.randomBytes(IV_LENGTH);
    var cipher = _crypto2.default.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    var encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
};

var decrypti = function decrypti(text, key) {
    var ENCRYPTION_KEY = key;
    var textParts = text.split(':');
    var iv = Buffer.from(textParts.shift(), 'hex');
    var encryptedText = Buffer.from(textParts.join(':'), 'hex');
    var decipher = _crypto2.default.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    var decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
};

exports.default = { encrypti: encrypti, decrypti: decrypti };