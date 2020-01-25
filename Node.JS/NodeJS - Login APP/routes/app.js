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

router.get('/application', (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.redirect('/auth/login');
  }

  const _query = req.app.locals.users;
  var set;
  var array = [];
  _query.query('SELECT * FROM composition', function (err, rows) {
    rows.forEach(element => {
      var full = {
        name: element.name,
        set : JSON.parse(element.set)
      } 
      array.push(full);
    });

    console.log(array);
    var content = JSON.stringify(array)
    console.log(array[0].name);
    res.render('application', {obj: content})
  });
});

module.exports = router;
