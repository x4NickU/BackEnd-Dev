/*
dbo.collection("customers").drop(function(err, result) {
if (err) throw err;
if (result) console.log("Collection deleted");
*/

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://nick:1234@cluster0-e2d7i.mongodb.net/test?retryWrites=true&w=majority";

MongoClient.connect(url, function(err,db) {
	if (err) throw err;
	var dbo = db.db("mydb");
	dbo.dropCollection("customers", function(err, delOK) {
		if (err) throw err;
		if (delOK) console.log("Collection Deleted");
		db.close();
	});
});