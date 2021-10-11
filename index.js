const express= require('express');
const cookieParser= require('cookie-parser');
const app= express();
const port=8000;

app.use(express.urlencoded());
app.use(cookieParser());

const expressLayout= require('express-ejs-layouts');
app.use(expressLayout);
app.use(express.static('./assets'));

const db= require('./config/mongoose');

const User= require('./models/user');
const { urlencoded } = require('express');

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use('/', require('./routes/index'));
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err)
{
    if(err)
    {
        console.log(`Error due to: ${err}`);
        return;
    }
    console.log(`Server running at port: ${port}`);
});

