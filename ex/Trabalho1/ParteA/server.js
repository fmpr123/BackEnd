const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const fs = require('fs');
const uuidv1 = require('uuid/v1'); //Gerador de uuid

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(port, function () { console.log(`Servidor a correr na porta ${port}!`) });

//Função que faz a leitura do ficheiro de forma síncrono
function readFile(filename) {
    var file = fs.readFileSync(filename);
    return file;
};

//Listar todas as fotografias
app.get('/', function (req, res) {
    res.send(readFile('./photos.json'));
});

//Adicionar nova fotografia com id random
app.post('/', function (req, res) {
    var file = JSON.parse(readFile("./photos.json"));
    var fotoorder = Object.keys(file);
    var fotonumber = fotoorder.length;

    file['fotografia' + (fotonumber + 1)] = req.body;
    file['fotografia' + (fotonumber + 1)].id = uuidv1();

    var content = JSON.stringify(file, null, 4);
    fs.writeFile('./photos.json', content, function (err) {
        if (err) throw err;
        console.log('Fotografia guardada com sucesso!');
    });
});

//Selecionar fotografias de um determinado uploader
app.get('/uploader/:up', function (req, res) {
    var file = JSON.parse(readFile("./photos.json"));
    var fotoorder = Object.keys(file);
    var fotonumber = fotoorder.length;
    var resultado = {};

    for (var i = 1; i <= fotonumber; i++) {  //Percorre as chaves do objeto
        if (file['fotografia' + i].uploader == req.params.up) {
            resultado['fotografia' + i] = file['fotografia' + i];
        }
    }
    res.send(resultado);
});

//Incrementar numero de likes e guardar
app.post('/:fotografia/:qlikes', function (req, res) {
    var file = JSON.parse(readFile("./photos.json"));

    var totalLikes = (file[req.params.fotografia].likes + req.params.qlikes * 1);
    file[req.params.fotografia].likes = totalLikes;

    var content = JSON.stringify(file, null, 4);
    fs.writeFile('./photos.json', content, function (err) {
        if (err) throw err;
        console.log('Guardado com sucesso!');
    });
    res.send(file[req.params.fotografia]);
});

//Listar por tags
app.get('/tags/:tg', function (req, res) {
    var file = JSON.parse(readFile("./photos.json"));
    var fotoorder = Object.keys(file);
    var fotonumber = fotoorder.length;
    var resultado = {};
    var qtags = req.params.tg.split("+");

    for (var i = 1; i <= fotonumber; i++) {  //Percorre as chaves do objeto
        for (var d = 0; d <= file['fotografia' + i].tags.length; d++) {  //Percorre o array que contém as tags do objeto
            for (var x = 0; x < qtags.length; x++) {  //Percorre o array das tags pedidas
                if (file['fotografia' + i].tags[d] == qtags[x]) {
                    resultado['fotografia' + i] = file['fotografia' + i];  //Objeto substitui repetidos
                }
            }
        }
    }
    res.send(resultado);
});