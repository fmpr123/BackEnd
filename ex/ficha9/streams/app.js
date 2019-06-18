var readable = fs.createReadStream('texto.txt');

readable.on('data', function(chunk){
    console.log(chunk);
});

readable.on('end', function(chunk){
    console.log("Completed Stream")
});