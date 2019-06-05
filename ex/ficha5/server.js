const express=require('express');
const bodyParser=require('body-parser');
const app=express();
const port=3000;
const fs=require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

function readFile(filename){
    var file=fs.readFileSync(filename);
    return file;
}

//Get
app.get('/users', function(req, res) {
     res.send(readFile("./persons.json"));
 });

//Post
app.post('/users', function(req, res) {  
    var obj=JSON.parse(readFile("./persons.json"));
    obj['person4'] = req.body;
    res.send(obj);
});

//Delete
app.delete('/users/:id', function(req, res) {
    var obj=JSON.parse(readFile("./persons.json"));
    delete obj['person' + req.params.id];
    res.send(obj);
});

//Select
app.get('/users/:id', function(req, res) {
    var obj=JSON.parse(readFile("./persons.json"));
    pers=obj['person'+req.params.id];
    res.send(pers);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
