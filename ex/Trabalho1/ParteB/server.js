const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const fs = require('fs');
const uuidv1 = require('uuid/v1'); //Gerador de uuid

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.listen(port, function () {
    console.log(`Servidor a correr na porta ${port}!`)
});

//Função que faz a leitura do ficheiro de forma síncrono
function readFile(filename) {
    var file = fs.readFileSync(filename);
    return file;
};

// Fotografia pelo id e envia na resposta
app.get('/fotografia/:id', function (request, response) {
    var id = request.params.id;
    var file = readFile("photos.json");
    var data = JSON.parse(file);
    response.send(data[id]);
});

// Apagar fotografia caso exista
app.delete('/delete/:id', function (request, response) {
    var id = request.params.id;
    var file = readFile("photos.json");
    var data = JSON.parse(file);
    if (data[id] == null) {
        response.send("Fotografia com o id apresentado nao existe !");
    } else {
        delete data[id];
        fs.writeFileSync('./photos.json',JSON.stringify(data), function (err) {
            if (err) throw err;
            response.send("Fotografia eliminada com sucesso!");
        });
    }
});

// Adiciona dislike a foto indicada no ID
app.get('/dislike/:id', function (request, response) {
    var id = request.params.id;
    var file = readFile("photos.json");
    var data = JSON.parse(file);
    data[id].dislikes += 1;
    fs.writeFileSync("photos.json",JSON.stringify(data));
    response.send(data[id]);
});

//Adiciona um comentario ao foto com o ID fornecido no body
app.post('/addcomment', function (request, response) {
    var file = readFile("photos.json");
    var id = request.body.id;
    var comment = request.body.comments;
    var data = JSON.parse(file);
    data[id].comments.push(comment);
    fs.writeFileSync("photos.json", JSON.stringify(data));
    response.send(data[id]);
});

// Ordena a lista por likes
app.get('/ordena', function (request, response) {
    var file = readFile("photos.json");
    var data = JSON.parse(file);
    var resultado = [];
    for (x in data) {
        resultado.push(data[x]);
    }
    var ordenado = resultado.sort(function (c1, c2) {
        if (c1.likes > c2.likes) {
            return -1;
        } else {
            return 1;
        }
    });
    response.send(ordenado);
});