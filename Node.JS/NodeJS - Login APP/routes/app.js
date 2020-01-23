var express = require('express');
var router = express.Router();

router.get('/main', (req, res, next) => {
  const messages = req.flash();
  var userState = req.app.locals.setUser;
  console.log("Check logged" + userState);
  if (!req.isAuthenticated()) res.redirect('/auth/login');
  if ((userState == 'payed') || (userState == 'free')) res.render('application', {messages});
  if (userState == 'need') res.redirect('/auth/register');
});

router.post('/main', (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.redirect('/auth');
  }
});

module.exports = router;
