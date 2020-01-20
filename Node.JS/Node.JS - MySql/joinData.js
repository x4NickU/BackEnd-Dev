/*
SELECT users.name AS user, products.name AS favorite FROM users JOIN products ON users.favorite_product = products.id
LEFT JOIN products ON users.favorite_product = products.id
*/
var mysql = require('mysql');

var connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "mydb"
});

connection.connect(function (err) {
	if (err) throw err;
	var sql = "LEFT JOIN products ON users.favorite_product = products.id";
	connection.query(sql, function(err, result) {
		if (err) throw err;
		console.log(result);
	})
})