/*
	Delete simple
	var query = {address: 'Mountain 21' };
	dbo.collection("customers").deleteOne(query, function (err, result) {
	
	Delete Multi
	var myquery = { address: /^O/ };
    dbo.collection("customers").deleteMany(myquery, function(err, obj) {
*/

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://nick:1234@cluster0-e2d7i.mongodb.net/test?retryWrites=true&w=majority";

MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	var dbo = db.db("mydb");
	var query = {address: /^O/ };
	dbo.collection("customers").deleteMany(query, function (err, result) {
		if (err) throw err;
		console.log(result.result.n + " Documents Removed");
		db.close();
	});
});