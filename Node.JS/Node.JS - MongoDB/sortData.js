/*
{ name: 1 } // ascending
{ name: -1 } // descending
*/

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://nick:1234@cluster0-e2d7i.mongodb.net/test?retryWrites=true&w=majority";

MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	var dbo = db.db("mydb");
	var mysort = {name: -1};
	dbo.collection("customers").find().sort(mysort).toArray(function(err,result) {
		if (err) throw err;
		console.log(result);
		db.close();
	});
});