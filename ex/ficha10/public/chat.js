$(function () {
    //make connection
    var socket = io.connect();

    //buttons and inputs
    var message = $("#message");
    var username = $("#username");
    var send_message = $("#send_message");
    var send_username = $("#send_username");
    var show_users= $("#show_users")
    var chatroom = $("#chatroom");
    var feedback = $("#feedback");

    //Emit message
    send_message.click(function () {
        socket.emit('new_message', { message: message.val() })
        console.log(message.val())
    })

    //Listen on new_message
    socket.on("new_message", function(data){
        chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
    })

    //Emit a username
    send_username.click(function () {
        socket.emit('change_username', { username: username.val() })
    })

    //Emit typing
    message.bind("keypress",function (){
        socket.emit('typing')
    })

    //Listen on typing
    socket.on('typing', function(data)  {
        feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>")
    })

    socket.on("users_update",function(users){
        show_users.append("<p><i>"+users+"</i></p>");
    })
});