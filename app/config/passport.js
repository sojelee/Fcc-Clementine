'use strict';
var GITHUBStrategy = require('passport-github'),
    User           = require('../../models/user'),
    configAuth     = require('./auth');

module.exports = (passport)=>{
   passport.serializeUser((user,done)=>{
       done(null,user.id);
   });
   passport.deserializeUser((id,done)=>{
       User.findById(id,(err,user)=>{
        done(err,user);
       });
   });
   passport.use(new GITHUBStrategy({
       clientID:configAuth.githubAuth.clientID,
       clientSecret:configAuth.githubAuth.clientSecret,
       callbackURL:configAuth.githubAuth.callbackURL
   },

   (token,refreshToken,profile,done)=>{
       process.nextTick(()=>{
         User.findOne({'github.id':profile.id},(err,user)=>{
             if(err) return done(err);
             if(user) return done(nulll,user);
             var newUser = new User();
                 newUser.github.id = profile.id;
                 newUser.github.username = profile.username;
                 newUser.github.displayName = profile.displayName;
                 newUser.github.publicRepos = profile._json.public._repos;
                 newUser.nbrClicks.clicks = 0;

                 newUser.save((err)=>{
                     if(err) throw err;
                     return done(null,newUser);
                 })
         });
       });
   }));
};