var array = [];


array.push(
    function(){
        console.log("Hello world 1");
    },
    function(){
        console.log("Hello world 2");
    },
    function(){
        console.log("Hello world 3");
    }
);

console.log(array);