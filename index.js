const express= require('express');
const cookieParser= require('cookie-parser');
const app= express();
const port=8000;
const db= require('./config/mongoose');
const session= require('express-session');
const passport= require('passport');
const passportLocal= require('./config/passport-local-strategy');

app.use(express.urlencoded());
app.use(cookieParser());

const expressLayout= require('express-ejs-layouts');
app.use(expressLayout);
app.use(express.static('./assets'));


app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name:'codeial',
    //TODO change secret before deployement
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000 * 60 * 100)
    }
}
));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes'));

app.listen(port,function(err)
{
    if(err)
    {
        console.log(`Error due to: ${err}`);
        return;
    }
    console.log(`Server running at port: ${port}`);
});

