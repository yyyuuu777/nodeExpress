var mysql  = require('mysql');
var connection = mysql.createConnection({
          host     : 'localhost',
          user     : 'root',
          password : '123456',
          database : 'test'

});

connection.connect();
console.log('connect mysql done');
connection.query('SELECT * from user', function (error, results, fields) {
          if (error) throw error;
          console.log('The solution is: ', results[0]);

});
module.exports = connection;

