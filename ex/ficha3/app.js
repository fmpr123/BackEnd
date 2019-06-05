
// function started(){
//     console.log('Started Download');
// }

// function update(per){
//     var per = 0;
//     for(var i=0;i<=100;i++){
//         console.log(per,'% of Download');
//         per++;
//     }
// }

// function completed(){
//     console.log('Download complete');
// }

// function performDownload(started,update,completed){
//     started();
//     update();
//     completed();
// }

// performDownload(started,update,completed);

//-----------------------------------------------

var arrayUtils = require('./ArrayUtils.js');

var x = arrayUtils.concatenate([1,2,3],[4,5,6]);

console.log(x);