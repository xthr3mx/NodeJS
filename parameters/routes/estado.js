var host = 'http://127.0.0.1:3649/h05t';

exports.categoria = function(req, res){
	var categoria = req.params.categoria;
	console.log('response::'+host+'/data/'+req.params.categoria);
	res.send(host+'/data/'+categoria);
};

exports.test = function(req, res){
	var	municipio = req.params.municipio,
		categoria = req.params.categoria;
	console.log('response::'+host+'/data/'+municipio+'/'+categoria);
	res.send(host+'/data/'+municipio+'/'+categoria);
};

