var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://nick:1234@cluster0-e2d7i.mongodb.net/test?retryWrites=true&w=majority";

MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	var dbo = db.db("mydb");
	dbo.createCollection("customers", function (err,res) {
		if (err) throw err;
		console.log("Collection created");
		db.close();
	});
});