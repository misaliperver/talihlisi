const moment = require('moment');
const randomstring = require("randomstring");
const admin = require("firebase-admin");
db = admin.database()
module.exports = function() {
  var date_now = moment().format("YYYY-MM-DD HH:mm:ss");
  var couple2raffle = function(raffle, callback){
    var newdata = {
        key: "",
        email: raffle.email,
        cdate: date_now,
        title: raffle.title,
        issue: raffle.issue,
        admin: raffle.admin,
        limit: raffle.limit,
        url: randomstring.generate(24),
        deleteurl: randomstring.generate(7)
    }
    var newraffle = db.ref("raffles/couple2raffle").push();
    newraffle.set(newdata);
    newdata.key = newraffle.key;
    callback(newdata);
  }

  return {
    couple2raffle : couple2raffle
  };
};
