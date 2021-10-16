const passport= require('passport');

const LocalStrategy= require('passport-local').Strategy;

const User= require('../models/user');

//authentication using passport
passport.use(new LocalStrategy(
    {
        usernameField:'email'
    },
//finding user
    function(email,password,done)
    {
         User.findOne({email:email},function(err,user)
         {
             if(err)
             {
                 console.log('error in fetching user');
                 return done(err);
             }

             if(!user || user.password!= password)
             {
                 console.log('Invalid credentials');
                 return done(null, false);
             }
             
             return done(null,user);
         });
    }
));

//serializing the user to decide what to keep in the cookies
passport.serializeUser(function(user,done)
{
    done(null,user.id);
});

//deserializing the user from the cookie
passport.deserializeUser(function(id,done)
{
    User.findById(id,function(err,user)
    {
        if(err)
        {
            console.log('error in deserializing');
            return done(err);
        }

        done(null,user);
    });
});

module.exports= passport;
    

    
