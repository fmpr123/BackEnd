const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'personsdb'
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
connection.connect();

app.get('/persons', function (req, res) {
    connection.query('SELECT * from Persons', function (err, rows, fields) {
        res.send(rows);
    });
});

app.post('/persons', function (req, res) {
    var query = 'INSERT into Persons(id,Firstname,Lastname,Profession,age)values?';
    var pnome=req.body.Firstname;
    var unome=req.body.Lastname;
    var prof=req.body.Profession;
    var idade=req.body.age;
    var dados = [[0, pnome, unome, prof, idade]];
    connection.query(query, [dados], function (err, rows, fields) {
        if (err) throw err;
        res.send("Id:" + rows.insertId);
    });
});

app.delete('/persons', function (req, res) {
    var id = req.body.id;
    connection.query('DELETE from persons where id=?', id, function (err, rows, fields) {
        if (err) throw err;
        res.send("Linhas afetadas: " + rows.affectedRows);
    });
});

app.get('/persons/:id', function (req, res) {
    var id = req.params.id;
    connection.query('SELECT * from Persons where id=?', id, function (err, rows, fields) {
        if (err) throw err;
        res.send(rows);
    });
});

app.get('/persons/:id/:Profession', function (req, res) {
    var id = req.params.id;
    var prof = req.params.Profession;
    connection.query('SELECT * from Persons where id=? or Profession=?', [id, prof], function (err, rows, fields) {
        if (err) throw err;
        res.send(rows);
    });
});


