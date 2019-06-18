const fs = require('fs');
const zlib = require('zlib');

var texto='';

var lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sollicitudin justo nec leo fringilla porta. Praesent lacus ipsum, semper pulvinar imperdiet in, faucibus ut elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras pellentesque consequat risus. Etiam porta nisi vel ex mattis sollicitudin. Sed augue justo, dapibus nec mollis ac, tempus vel magna. Donec bibendum elementum libero, et sollicitudin sapien hendrerit sed. Cras augue ante, vestibulum nec rhoncus eu, dictum sed lorem. Ut vitae ipsum suscipit, pharetra mi eu, consequat sapien. Pellentesque in ante vulputate, egestas lectus et, tincidunt nisl. Proin gravida magna quis lectus volutpat dictum."

// for (var i=0; i<1000000; i++){
//     texto = lorem + texto;
// };

// fs.writeFile('texto.txt', texto, function(err){
//     if (err) throw err;
// });

// fs.readFile('texto.txt', null, function(err){
//     if (err) throw err;
// });

var readable = fs.createReadStream('texto.txt');
var writeable = fs.createWriteStream('texto_copy.txt');

// readable.on('data', function(chunk){
//     // console.log(chunk);
//     writeable.write(chunk);
// });

// readable.on('end', function(chunk){
//     // console.log("Completed Stream")
//     writeable.end();
// });

//Copy data using pipe function
readable.pipe(writeable);

var gzip = zlib.createGzip();
var compressed = fs.createWriteStream('texto_copy.gz');

//chain methods with piping
//1- readable pipe to gzip
//2- pipe compressed data to a file

readable.pipe(gzip).pipe(compressed);