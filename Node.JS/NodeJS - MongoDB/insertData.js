var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://nick:1234@cluster0-e2d7i.mongodb.net/test?retryWrites=true&w=majority";

MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	var dbo = db.db("mydb");
	var myObject = { _id: 153, name: 'Chocolate Heaven'};
	dbo.collection("customers").insertOne(myObject, function (err, res) {
		if (err) throw err;
		console.log(res);
		db.close();
	});
});