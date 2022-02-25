const passport= require('passport');
const googleStrategy= require('passport-google-oauth').OAuth2Strategy;
const crypto= require('crypto');
const User= require('../models/user');

passport.use(new googleStrategy({
    clientID:"411256424461-bsiq5a8d50gf832vrl3gd33vqqintu2c.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:'http://localhost:8000/user/auth/google/callback'

},
  function(accessToken, refreshToken, profile, done){
      User.findOne({email:profile.emails[0].value}).exec(function(err,user){
          if(err){
              console.log('error in google user', err);
              return;
          }
          console.log(profile);
          if(user){
              return done(null,user);
          }
          else{
              User.create({
                  name:profile.displayName,
                  email:profile.emails[0].value,
                  password: crypto.randomBytes(20).toString('hex')
              }, function(err,user){
                  if(err){
                      console.log('error in creating user throgh G-auth',err);
                      return;
                  }

                  return done(null,user);
              })
          }
      })
  }

));

module.exports= passport;

