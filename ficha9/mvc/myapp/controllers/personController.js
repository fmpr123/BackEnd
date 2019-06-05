const mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'personsdb'
});

connection.connect();

exports.person_detail=function(req,res,next){
    var userId=req.params.id;
    var query='select * from persons where id=?';
    connection.query(query,userId, function (err, rows, fields) {
        if(err) throw err;
        res.render('person',{title:'Person Detail',person:result[0]});
    });
};