const express = require('express');
const port = 3000;
const fs=require('fs');
const app=express();

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
// app.get('/', (req, res) => res.send('Working!'));

fs.open("./log.txt",'a',function(){
    console.log('Ficheiro Aberto');
});

//Function que guarda mudanças no ficheiro
function writelog(req,res){
    var log=req.path+", "+req.method+", "+new Date()+"\n";
    fs.appendFile('log.txt',log,function(err){
        if(err) throw err;
    });
}

//Cabeçalho+Saudação
app.get('/root',function(req,res){
    writelog(req,res);
    res.writeHead(200,{'Content-type':'text/plain'});
    res.end('Bom dia!');
});

//Criar ficheiro HTML
app.get('/',function(req,res){
    writelog(req,res);
    var file = fs.readFileSync('./texto.html');
    String(file);
    res.send(file);
    //Ao processar HTML é preciso converte-lo para string
});

//Endpoint user
app.get('/user',function(req,res,name){
    writelog(req,res);
    res.writeHead(200,{'Content-type':'text/plain'});
    name = 'Fabrício';
    res.end(name);
});

//Listar conteúdo do ficheiro log.txt
app.get('/listar',function(req,res){
    writelog(req,res);
    var file = fs.readFileSync('./log.txt');
    res.end(file);
});

//Fazer o download do ficheiro log.txt
app.get('/download',function(req,res){
    writelog(req,res);
    res.download('./log.txt');
});

//Apagar ficheiro log.txt
app.get('/clear',function(req,res){
    fs.unlink('./log.txt',function(err){
        if(err) throw err;
        console.log('Apagado com sucesso');
    });
});


