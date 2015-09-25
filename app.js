var express = require('express');
var app = express();
//var server = require('http').Server(app);
//var io = require('socket.io')(server);
var server = app.listen(3000,function(){
	console.log('服务器已经启动。。。');
});
var io =require('socket.io')(server);
app.use(express.static(__dirname+'/public'));
app.get('/',function(req,res){
	res.sendFile(__dirname+'/views/index.html');
});
io.on('connection',function(socket){
	socket.on('chat message',function(msg){
		io.emit('chat message',msg);
	});
});

