$(function () {
	//make connection
	var socket = io.connect('http://localhost:3000')

	//buttons and inputs
	var message = $("#message")
	var username = $("#username")
	var send_message = $("#send_message")
	var send_username = $("#send_username")
	var chatroom = $("#chatroom")
	var feedback = $("#feedback")

	//Emit message
	send_message.click(function () {
		socket.emit('new_message', { message: message.val() })
	})

	//Listen on new_message
	socket.on("new_message", (data) => {
		feedback.html('');
		message.val('');
		chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
	})

	//Listen on user connection
	socket.on("user_connect", (socket) => {
		chatroom.append("<p class='message'>New User connected: " + socket.username + "</p>")
	})

	//Listen on user disconnect
	socket.on("user_disconnect", (socket) => {
		chatroom.append("<p class='message'>" + socket.username + " disconnected"+"</p>")
	})

	//Emit a username
	send_username.click(function () {
		socket.emit('change_username', { username: username.val() });
		chatroom.append("<p class='message'>" + "Name change to: " + username.val() + "</p>");
	})

	//Emit typing
	message.bind("keypress", () => {
		socket.emit('typing')
	})

	//Listen on typing
	socket.on('typing', (data) => {
		feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>")
	})
});


