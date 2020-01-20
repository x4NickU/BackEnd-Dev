/*
	var query = { address: "Valley 345" };
	var newValues = {$set: {name: "Mikey", address: "Canyon 123"}};
	dbo.collection("customers").updateOne(query, newValues, function(err,res)
	{ n: 1, nModified: 2, ok: 1 }
*/

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://nick:1234@cluster0-e2d7i.mongodb.net/test?retryWrites=true&w=majority";

MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	var dbo = db.db("mydb");
	var query = { address: /^S/ };
	var newValues = {$set: {name: "Test"}};
	dbo.collection("customers").updateMany(query, newValues, function(err,res){
		if (err) throw err;
		console.log(res.result.nModified + " document updated");
		db.close();
	});
});