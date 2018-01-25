'use strict';
var GITHUBStrategy = require('passport-github2').Strategy,
    passport              = require('passport'),
    User           = require('../../models/user'),
    configAuth     = require('./auth');

   passport.serializeUser((user,done)=>{
       done(null,user.id);
   });
   passport.deserializeUser((id,done)=>{
       User.findById(id,(err,user)=>{
        done(err,user);
       });
   });
   passport.use(new GITHUBStrategy({
       'clientID':'5e371e9a02e96788bb41',
       'clientSecret':'502fafe7a7e2cd509d03e51998ec08a0a405d5ad',
       'callbackURL':'http://127.0.0.1:8080/auth/github/callback'
   },

   (token,refreshToken,profile,done)=>{
       process.nextTick(()=>{
         User.findOne({'github.id':profile.id},(err,user)=>{
             if(err) return done(err);
             if(user) return done(null,user);
             var newUser = new User();
                 newUser.github.id = profile.id;
                 newUser.github.username = profile.username;
                 newUser.github.displayName = profile.displayName;
                 newUser.github.publicRepos = profile._json.public_repos;
                 newUser.nbrClicks.clicks = 0;

                 newUser.save((err)=>{
                     if(err) throw err;
                     return done(null,newUser);
                 })
         });
       });
   }));
   
module.exports = passport;