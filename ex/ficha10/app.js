const express = require('express')
const app = express()
const fs = require('fs');

//Opens and/or creates the file
fs.open("./log.txt", 'a', function () {
    fs.appendFile('log.txt', new Date() + "\n", function (err) {
        if (err) throw err;
    });
});

//Function that writes to file
function writelog(data, username) {
    var log = username + ": " + data.message + "\n";
    fs.appendFile('log.txt', log, function (err) {
        if (err) throw err;
    });
}

//set the template engine ejs
app.set('view engine', 'ejs')

//middlewares
app.use(express.static('public'))

//routes
app.get('/', (req, res) => {
    res.render('index')
})

//Listen on port 3000
server = app.listen(3000)

//socket.io instantiation
const io = require("socket.io")(server)

//listen on every connection
io.on('connection', (socket) => {
    console.log('New user connected')

    //default username
    socket.username = "Anonymous"

    //Listen on user connection
    io.sockets.emit('user_connect', { username: socket.username });

    //Listen on user disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected');
        io.sockets.emit('user_disconnect', { username: socket.username });
    })

    //listen on change_username
    socket.on('change_username', (data) => {
        socket.username = data.username
    })

    //listen on new_message
    socket.on('new_message', (data) => {
        //broadcast the new message
        io.sockets.emit('new_message', { message: data.message, username: socket.username });
        writelog(data, socket.username);
    })

    //listen on typing
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', { username: socket.username })
    })

    console.log(socket);
})