var express = require('express');
var swig = require('swig');
var app = express();
var server = app.listen(process.env.PORT || 3000,function(){
	console.log('服务器已经启动。。。');
});
var io =require('socket.io')(server);
app.use(require('body-parser')());
app.use(express.static(__dirname+'/public'));
app.engine('html',swig.renderFile);
app.set('view engine','html');
app.set('views',__dirname+'/views');

var sessionMiddleware = require('express-session')({secret:'3ddfse47i'});

app.use(sessionMiddleware);

app.get('/',function(req,res){
	if(!req.session.info){
		res.render('index');	
	}else{
		res.render('index',{form:'hh',bigname:req.session.info.niname});
	}
});
app.post('/login',function(req,res){
	if(req.body.niname){
		req.session.info = {
			niname : req.body.niname
		}
		res.redirect(303,'/');
	}else{
		res.redirect(303,'/');
	}
});

io.use(function(socket,next){
	sessionMiddleware(socket.request,socket.request.res,next);
	next(new Error('a error'));
}); //这个中间件，使socket可以访问到session...
var onlineCount = 0;
io.on('connection',function(socket){
	var session = socket.request.session;
	try{
		var niname = session.info.niname;
		onlineCount++ ;
		io.emit('login',niname,onlineCount);
		console.log(niname+'加入聊天室,当前在线人数:'+onlineCount);
	}catch(e){
		io.emit('initCount',onlineCount);
		console.log('初始化当前人数为:'+onlineCount);
	}
	socket.on('chat message',function(msg){
		socket.broadcast.emit('chat message',niname,msg);
	});
	socket.on('disconnect',function(){
		try{
			var niname = session.info.niname;
			onlineCount--;
			console.log(niname+'退出了聊天室,当前在线人数:'+onlineCount);
			io.emit('logout',niname,onlineCount);
		}catch(e){
			console.log('一个ip退出了当前网页,当前在线人数:'+onlineCount);
		}
	});	
});
app.use(function(error,req,res,next){
	if(error) console.stack(error);
	else{
		res.send(404,'have a error');
	}
});
