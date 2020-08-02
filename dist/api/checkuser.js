'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('../db/config');

var _config2 = _interopRequireDefault(_config);

var _firebaseAdmin = require('firebase-admin');

var admin = _interopRequireWildcard(_firebaseAdmin);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var db, users, data, friends, $, x, returna, newreturna;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            db = admin.firestore().collection("users");
            _context.next = 3;
            return db.get();

          case 3:
            users = _context.sent;
            data = req.body.data;

            try {
              data = JSON.parse(data);
            } catch (e) {}
            if (!Array.isArray(data)) res.send("404");
            friends = [];
            $ = users.docs.map(function (user) {
              return user.data();
            });


            $.sort(function (a, b) {
              a.phoneNumber = a.phoneNumber.replace("+", "");
              b.phoneNumber = b.phoneNumber.replace("+", "");
              return Number.parseInt(a.phoneNumber) - Number.parseInt(b.phoneNumber);
            });
            data.sort(function (a, b) {
              a.number = a.number.replace("+", "");
              b.number = b.number.replace("+", "");
              return Number.parseInt(a.number) - Number.parseInt(b.number);
            });
            x = 0;
            returna = data.map(function (dat) {
              var ne = void 0;
              console.log(dat);
              $.forEach(function ($$) {
                console.log($$.phoneNumber);
                dat.number = "+" + dat.number;
                if (dat.number === $$.phoneNumber) {
                  ne = {
                    id: 0,
                    phoneNumber: $$.phoneNumber,
                    name: $$.name,
                    status: $$.status,
                    avatar: ".",
                    el: dat
                  };
                  x++;
                }
              });
              if (ne !== undefined) {
                return ne;
              }
            });
            newreturna = returna.filter(function (element) {
              return element !== undefined;
            });

            console.log($);
            console.log(data);
            console.log(newreturna);
            res.status(200).send(JSON.stringify(newreturna));
            // const test = (data)=>new Promise((res, rej)=>{
            //   let x = 0
            //   while(x != data.length){
            //     let el = data[x]
            //     try{
            //       const query = `SELECT * FROM api_users WHERE phoneNumber='${el.number}'`
            //       sql.get(query, (err, row) => {
            //         if (row) {
            //           friends.forEach((le)=>{
            //             if(row != null && el != null){
            //               if(row.phoneNumber == le.phoneNumber){
            //                 row = null
            //                 el = null
            //               }
            //             }
            //           })
            //           friends.push({...row, el})
            //           x++
            //         }
            //         if(err) throw err
            //       })
            //     }
            //     catch(err){

            //     }
            //     x++
            //   }
            //   setTimeout(()=>res("whatever"), 500)

            // })
            // test(data).then(()=>{
            //   friends.push({
            //     id:666,
            //     phoneNumber:"+6667778889990",
            //     name : "Slime Indonesia",
            //     avatar : ".",
            //     status : "Saya Slime",
            //     el : {
            //       name:"Slime Indonesia",
            //       number : "+6667778889990"
            //     }
            //   })
            //   friends.push({
            //     id : 57,
            //     phoneNumber:"+6289517148350",  
            //     name : "Anggita P. Lesmana",
            //     status:"CEO Slime Indonesia",
            //     avatar:".",
            //     el:{
            //       name : "Anggita Lesmana",
            //       number: "+6289517148350",
            //     }
            //   })
            //   res.send(JSON.stringify(friends))

            // })

          case 18:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function checkUser(_x, _x2) {
    return _ref.apply(this, arguments);
  }

  return checkUser;
}();