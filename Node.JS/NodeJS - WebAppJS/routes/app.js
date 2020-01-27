var express = require('express');
var router = express.Router();

router.get('/main', (req, res, next) => {
  const messages = req.flash();
  var userState = req.app.locals.setUser;
  if (!req.isAuthenticated()) res.redirect('/auth/login');
  if ((userState == 'payed') || (userState == 'free')) res.redirect('/app/application?#');
  if (userState == 'need') res.redirect('/auth/register');
});

router.post('/main', (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.redirect('/auth/login');
  }
});

/*
Select Composition -> composition name -> marca -> #codici
Select product -> #codici -> name,pricezzzzzzzzzzzzz<<
*/
router.get('/application', (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.redirect('/auth/login');
  }
  res.render('application')
});

router.post('/application', (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.redirect('/auth/login');
  }
  if (req.body.case == 'select' )  {
    const _query = req.app.locals.users;
    var array = [];
    _query.query('SELECT * FROM composition', function (err, rows) {
      rows.forEach(element => {
        var full = {
          name: element.name,
          set : JSON.parse(element.set)
        } 
        array.push(full);
      });
    var content = JSON.stringify(array)
    res.send({ data : content});
    });
  }else if (req.body.case == 'getProducts' )  {
    const _query = req.app.locals.users;
    var productsArray = [];
    var items = JSON.parse(req.body.items);
    console.log(items);
    _query.query('SELECT * FROM products WHERE serial IN ('+items+')', function (err, rows) {
      console.log("Righe: " + rows);
      if (err) {res.send({donuts : "empty"});return};
        if (!rows) {res.send({donuts : "empty"});return};
        if (rows == null) {res.send({donuts : "empty"});return};


        rows.forEach(item => {
          console.log("Righe: " + item.name)
          var obj = {
            name: item.name,
            serial: item.serial,
            price: item.price
          }
          productsArray.push(obj);
        })
        var content = JSON.stringify(productsArray)
        res.send({donuts : content});
      });


  }else{
    res.render('application');
  }
});

module.exports = router;
