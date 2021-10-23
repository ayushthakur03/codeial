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

//checking if the user is authenticated
passport.checkAuthentication= function(req,res,next){
    if(req.isAuthenticated())
    {
        return next();
    }

    return res.redirect('/user/sign_in');
}

passport.setAuthenticatedUser= function(req,res,next)
{
    if(req.isAuthenticated())
    {
        res.locals.user= req.user;
    }

    next();
}

passport.checkSignedin= function(req,res,next)
{
    if(req.isAuthenticated())
    {
        return res.redirect('/user/profile');
    }

    next();
}

module.exports= passport;
    

    
