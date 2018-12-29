var path = require('path');
var express = require('express');

var router = express.Router();
var homecontroller = require(path.join(__dirname, '../controllers/HomeController.js'));


router.use(function(req, res, next){
    console.log('MiddleWare --> AnaRoute');
    next();
});
router.get('/', homecontroller.get_home);
router.get('/couple', homecontroller.couple2raffle);

module.exports = router;