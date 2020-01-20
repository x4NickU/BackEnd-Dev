var mysql = require('mysql');

var connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "mydb"
});

connection.connect(function (err) {
	if (err) throw err;
	console.log("Connected");
	var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
	connection.query(sql, function (err, result) {
		if (err) throw err;
		console.log("1 Record inserted, ID: " + result.insertId);
	});
});