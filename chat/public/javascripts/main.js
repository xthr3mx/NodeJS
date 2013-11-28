var socket = io.connect("http://127.0.0.1:3000");

socket.on('connect',function(){
	socket.emit("adduser",prompt("Please input your username:"));
});

socket.on('updatechat',function(username,data){
	$("#b-right").append('<b>'+username+'</b>'+data+'<br />');
});

socket.on('updateusers',function(data){
	$("#b-left").empty();
	$("#b-left").append('<h2>Users connected</h2>');
	$.each(data,function(key,value){
		$("#b-left").append('<div>'+key+'</div>');
	});
});

function start(){
	$("input#message").keypress(function(e){
		if(e.which==13){
			var message=$("input#message").val();
			$("input#message").val('');
			socket.emit("sendchat",message);
		}		
	});
}
$(document).ready(start);
