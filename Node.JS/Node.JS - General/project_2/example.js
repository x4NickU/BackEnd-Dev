var url = require('url');
var address = 'http://localhost:8080/default.htm?year=2017&month=february';
var _query = url.parse(address, true);

console.log(_query.host);
console.log(_query.pathname);
console.log(_query.search);

var queryData = _query.query; //Object {year: 2017 , month: 'february'};
console.log(queryData.year);
console.log(queryData.month); 