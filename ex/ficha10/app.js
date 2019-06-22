const express = require('express')
const app = express()
const fs = require('fs');
const multer = require('multer');
const path = require('path');

//Listen on port 3000
server = app.listen(3000)

//socket.io instantiation
const io = require("socket.io")(server)

// Set The Storage Engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Init Upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('myImage');

// Check File Type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

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
app.use(express.static('./public'));

//routes
app.get('/', (req, res) => {
    res.render('index')
})

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
        var old_username = socket.username;
        socket.username = data.username
        io.sockets.emit('new_username', { new_username: socket.username, old_username: old_username });
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

    app.post('/', (req, res) => {
        upload(req, res, (err) => {
            if (err) {
                res.render('index', {
                    msg: err
                });
            } else {
                if (req.file == undefined) {
                    res.render('index', {
                        msg: 'Error: No File Selected!'
                    });
                } else {
                    res.render('index', {
                        msg: 'File Uploaded!',
                    });
                    io.sockets.emit('send_image', { image_path: req.file.filename, username: socket.username });
                }
            }
        });
    });

})