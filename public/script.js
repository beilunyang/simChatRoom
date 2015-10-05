$('#messages').focus();
var socket = io();
$('#shuru').submit(function(){
	var message = $('#messages').val();
	socket.emit('chat message',message);
	var apHtml = '<div><div class="dialog"><div class="name">'+$('#hook').text()+'</div><div class="info">'+message+'</div></div><div style="clear: both;"></div></div>';
	$('#mCSB_1_container').append($(apHtml));
	$('.room').mCustomScrollbar('scrollTo','bottom');
	$('#messages').val('');
	return false;//这句一定要加
});
socket.on('chat message',function(niname,msg){
	var apHtml = '<div><div class="dialog" style="float:right;"><div class="name">'+niname+'</div><div class="info">'+msg+'</div></div><div style="clear: both;"></div></div>';
	$('#mCSB_1_container').append($(apHtml));
	$('.room').mCustomScrollbar('scrollTo','bottom');
});
socket.on('login',function(msg,num){
	var apHtml = '<div class="login"><span>欢迎'+msg+'降临悖论の聊天室</span></div>';
	$('#onlineCount').text('当前在线人数:' + num);
	$('#mCSB_1_container').append($(apHtml));
	$('.room').mCustomScrollbar('scrollTo','bottom');
});
socket.on('logout',function(msg,num){
	var apHtml = '<div class="login"><span>'+msg+'带着小姨子跑了</span></div>'
	$('#onlineCount').text('当前在线人数:' + num);
	$('#mCSB_1_container').append($(apHtml));
	$('.room').mCustomScrollbar('scrollTo','bottom');
	
});
