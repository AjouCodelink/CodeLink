var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../../models/user');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy

router.get('/', function(req, res, next) {
  res.render('test');
});

passport.serializeUser(function(user, done) {
    console.log('passport session save : ', user.email)
    done(null, user.email);
})

passport.deserializeUser(function(email, done) {
    console.log('passport session get_id : ', email)
    done(null, email);
})

passport.use('local-join', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // 인증을 수행하는 인증 함수로 HTTP request를 그대로 전달할지 여부를 결정한다.
}, function(req, email, password, done) {
    User.findOne({email:email}, function(err, user){
      if(err) return done(err);
      if(user){
        console.log('your email is already used');
        return done(null, false, {message:'existed user'});
      } else{
        var user = new User();
        user.email = req.body.email;
        user.password = req.body.password;
        user.nickname = req.body.nickname;
        user.interests = req.body.interests;

        user.save(function(err){
          if(err) throw err
          console.log(email);
          return done(null, {'email':email});
        }) 
      }
    })
}));

router.post('/', passport.authenticate('local-join', {
    successRedirect: '/',
    failureRedirect: '/signup/save-user',
    failureFlash: true
}));



/*router.post('/', function(req, res){
    var user = new User();
    user.email = req.body.email;
    user.password = req.body.password;
    //user.nickname = req.body.nickname;
    //user.interests = req.body.interests;
    console.log(user);

    user.save(function(err){
      if(err){
        console.error(err);
        return res.json({result:0});
      }
      else res.json({result:1});
    })
});
*/
module.exports = router;