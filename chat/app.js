
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var path = require('path');

var app = express();
var 	server = require('http').createServer(app),
	io = require('socket.io').listen(server);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
server.listen(app.get('port'), function(){
	console.log('Server listening on port: '+app.get('port'));
});

app.get('/', routes.index);

// store the usernames (clients)
var usernames = {};

io.sockets.on('connection', function(socket){
	socket.on('sendchat',function(data){
		io.sockets.emit('updatechat',socket.username+' says: ',data);
	});

	socket.on('adduser',function(username){
		socket.username = username;
		usernames[username]=username;
		//socket.emit('updatechat','SERVER ','connected');
		socket.broadcast.emit('updatechat','',username+' connected');
		io.sockets.emit('updateusers',usernames);
	});

	socket.on('disconnected',function(){
		delete usernames[socket.username];
		io.sockets.emit('updateusers',usernames);
		sockets.broadcast.emit('updatechat','SERVER',socket.username+' disconnected.');
	});
});
