var User = require('../models/Users')()
var Cekilis = require('../models/Cekilis')() 

module.exports.get_home = function(req, res){
    res.render('index', { layout: 'privatelayout' });
}

module.exports.couple2raffle = function(req, res){
    errorMessage = (!req.query.title || !req.query.admin  ||
                    !req.query.email || !req.query.issue || !req.query.limit
    )? true:false;
    if(errorMessage){
        req.flash('error', 'Eksik Bilgi Doldurulmuş!');
        res.json({
            success:false,
            message:"Eksik Bilgileri Doldurup Yeniden Deneyiniz!"
        });
        return;
    }
    Cekilis.couple2raffle(req.query, function(raffle){
        res.json({
            success:true,
            message:"Oluşturuldu!",
            raffle: raffle
        });
        return;
    });
}