/*
var query = { address: "Park Lane 38"}; //Classic
var query = { address: /^S/ }; //Regular
*/

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://nick:1234@cluster0-e2d7i.mongodb.net/test?retryWrites=true&w=majority";

MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	var dbo = db.db("mydb");
	var query = { address: /^S/ };
	dbo.collection("customers").find(query).toArray(function(err,result) {
		if (err) throw err;
		console.log(result);
		db.close();
	});
});