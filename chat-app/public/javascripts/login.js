$(document).ready(function(){
    var host = window.location.hostname;
   
    var socketurl = "http://" + host;
    var socket = io.connect("http://"+host+":3000")

    $(document).on('click','#chat-btn',function(){

        $("#login-div").css("display","none")
        $("#chat-div").css("display","block")
        var user = $("#username").val()
        socket.emit('change_username', {username: user})
    })

    $(document).on('click','#send-msg',function(){

        var msg = $("#message").val()
        //alert(msg)
        socket.emit('new_message', {message: msg})
        $("#message").val("")
    })

    socket.on('new_message', (data) => {

        console.log(data)
        var html = "<p>" + data.username +": " + data.message;
        $("#chat-cotent").append(html)
        var elem = document.getElementById('chat-cotent');
        elem.scrollTop = elem.scrollHeight;
        
    })
    
});