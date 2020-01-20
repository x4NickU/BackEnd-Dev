/*
dbo.collection("customers").find({}).toArray(function(err, result) -> Find All
dbo.collection("customers").findOne({}, function (err,result) -> Take the first element
dbo.collection("customers").find({}, { projection: { _id: 0, name: 1, address: 1 } }).toArray(function(err, result) -> Find where
*/
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://nick:1234@cluster0-e2d7i.mongodb.net/test?retryWrites=true&w=majority";

MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	var dbo = db.db("mydb");
	dbo.collection("customers").find({}, { projection: {_id: 0 , address: 1 } }).toArray(function(err, result) {
		if (err) throw err;
		console.log(result);
		db.close();
	});
});