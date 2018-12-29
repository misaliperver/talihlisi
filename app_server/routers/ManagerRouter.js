
var path = require('path');
var homerouter = require(path.join(__dirname, './HomeRouter.js'));

module.exports = function(app){
	app.use('/', homerouter); 

	app.use(function(req, res, next){
		res.status(404);	
		if (req.accepts('html')) {	res.render('404'); return; }	
		if (req.accepts('json')) {	res.send({ error: 'Not found' }); res.end(); return; }	
		res.type('txt').send('Not found');
	});
}