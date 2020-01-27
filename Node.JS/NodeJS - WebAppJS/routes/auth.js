const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/login',(req,res,next) => {
    const messages = req.flash();
    res.render('login', {messages});
});

router.post('/login', passport.authenticate('Login',
  { failureRedirect: '/auth/login', 
    failureFlash: 'Wrong username or password'}), (req, res, next) => {
    res.redirect('/');
});

router.get('/register', (req,res,next) => {
    const messages = req.flash();
    res.render('register', { messages });
});

router.post('/register', passport.authenticate('Registration', { 
    failureRedirect: '/auth/register', 
    failureFlash: 'Username already exist',
    successRedirect: '/auth/login',
    successFlash: 'Account created'
    }), (req, res, next) => {
  res.redirect('/users');
});

router.get('/logout', (req,res,next) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;