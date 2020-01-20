var mysql = require('mysql');

var connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "mydb"
});

connection.connect(function (err) {
	if (err) throw err;
	var sql = "DELETE FROM customers WHERE address = 'Highway 37'";
	connection.query(sql, function (err, result) {
		if (err) throw err;
		console.log(result);
	});
});