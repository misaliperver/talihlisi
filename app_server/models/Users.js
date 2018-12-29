const bcrypt = require('bcryptjs');
const moment = require('moment')
const admin = require("firebase-admin");
db = admin.database()
module.exports = function() {
  
  function create_User(postData, callback) {
    var updates = {}
    bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(postData.password, salt, function(err, hash) {
        admin.auth().createUser({
          uid: postData.username,
          email: postData.email,
          emailVerified: false,
          password: hash,
          displayName: postData.firstname + " " + postData.lastname,
          disabled: false
        })
        .then(function(userRecord) {
            postData.password = hash;
            db.ref('/Users/' + postData.username).set(postData,
              function(error) {
                if (error) {
                  callback({'message': "Kullanici Yuklemesinde Hata2!", "success": false})
                } else {
                  callback({'message': "Kullanici Basariyla Kaydedildi", "success": true})
                }
            })
            
        })
        .catch(function(error) {
          console.log('catch')
          callback({'message': "Kullanici Yuklemesinde Hata!", "success": false})
        });

	    });
    });
  }

  function signin_User(postData) {
    admin.auth().signInWithEmailAndPassword(postData.email, postData.password).then((user)=>{
      user.getIdToken(true).then((token)=>{
          rsp.writeHead(200, {"Content-Type": "application/json"});
          rsp.end(JSON.stringify({token:token}));
      }).catch((err)=>{
            rsp.writeHead(500, {"Content-Type": "application/json"});
            rsp.end(JSON.stringify({error:err}));
        });
    }).catch((err)=>{
        rsp.writeHead(500, {"Content-Type": "application/json"});
        rsp.end(JSON.stringify({error:err}));
    });
  }

  function comparePassword(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if(err) throw err;
        callback(null, isMatch);
    });
  }
  return {
    create_User: create_User,
    signin_User: signin_User,
    comparePassword: comparePassword
  };
};
