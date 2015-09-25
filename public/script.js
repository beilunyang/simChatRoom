var socket = io();
$('#shuru').submit(function(){
	socket.emit('chat message',$('#messages').val());
	$('#messages').val('');
	return false;
});
socket.on('chat message',function(msg){
	var apHtml = '<div><div class="dialog"><div class="name">悖论</div><div class="info">'+msg+'</div></div><div style="clear: both;"></div></div>';
	$('#mCSB_1_container').append($(apHtml));
	$('.room').mCustomScrollbar('scrollTo','bottom');
})
