/*
SELECT * FROM customers
SELECT name, address FROM customers
SELECT * FROM customers WHERE address = 'Park Lane 38'
SELECT * FROM customers WHERE address LIKE 'S%'
SELECT * FROM customers ORDER BY name
SELECT * FROM customers ORDER BY name DESC -> Reverse order
SELECT * FROM customers LIMIT 5 -> Start from 5 position
SELECT * FROM customers LIMIT 5 OFFSET 2 || SELECT * FROM customers LIMIT 2, 5

var sql = 'SELECT * FROM customers where name = ? OR address = ?';
connection.query(sql,[name, extra], function (err, result, fields) {
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
	connection.query("SELECT * FROM customers LIMIT 2, 5", function (err, result, fields) {
		if (err) throw err;
		// result or: 
		console.log(result);
	});
});