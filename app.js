var express = require('express');
var swig = require('swig');
var app = express();
var server = app.listen(3000,function(){
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
		res.render('index',{form:'hh'});
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
});
io.on('connection',function(socket){
	var session = socket.request.session;
	try{
		var niname = session.info.niname;
	}catch(e){
		var niname = '匿名';
	}
	socket.on('chat message',function(msg){
		io.emit('chat message',niname,msg);
	});	
});
app.use(function(error,req,res,next){
	if(error) console.stack(error);
	else{
		res.send(404,'have a error');
	}
});
