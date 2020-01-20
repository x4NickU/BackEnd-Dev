
var mysql = require('mysql');

var connection = mysql.createConnection({
	hostname: "localhost",
	user: "root",
	password: "",
	database: "mydb"
});

connection.connect(function (err) {
	if (err) throw err;
	console.log("Connected");
	//DROP TABLE customers
	var sql = "DROP TABLE IF EXISTS customers";
	connection.query(sql, function (err, result) {
		if (err) throw err;
		if (result.warningCount > 0) {
			console.log("Table not exist");
		}else{
			console.log("Table deleted");
		}
	});
});