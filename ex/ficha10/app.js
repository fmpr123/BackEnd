// require and instantiate express
var express = require('express');
var app = express();

app.set('view engine', 'ejs'); // set up ejs for templating

//middlewares
app.use(express.static('public'));

// express server
var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port);
});
// route
app.get('/', function (req, res) {
    res.render('index.ejs');
});
var io = require('socket.io')(server);

var users = {};
// Registar o evento Connection
io.on('connection', (socket) => {
    console.log('New user connected')
    //default username
    socket.username = "Anonymous";
    // socket.id=uuid();

    users[socket.id] = socket.username;

    // console.log(users);
    //listen on change_username
    socket.on('change_username', function (data) {   
        socket.username = data.username;
        users[socket.id] = data.username;

        io.sockets.emit('users_update', users);
    })

    //listen on new_message
    socket.on('new_message', function (data) {
        //broadcast the new message
        io.sockets.emit('new_message', { message: data.message, username: socket.username });
    })

    //listen on typing
    socket.on('typing', function () {
        socket.broadcast.emit('typing', { username: socket.username })
    })

    console.log(users);
})