const User= require('../models/user');



module.exports.profile= function(req,res){
    res.send('<h1>Profile in users </h1>');
}

module.exports.like= function(req,res){
    res.send('<h1>Like in users </h1>');
}

module.exports.default= function(req,res){
    res.send('<h1>Users biatchhh </h1>');
}

module.exports.signin= function(req,res){
    return res.render('sign_in',{
        title:'Sign-in'
});
}

module.exports.sign_up= function(req,res){
    return res.render('sign_up',{
        title:'Sign-up'
});
}

module.exports.create= function(req,res)
{
    if(req.body.password != req.body.confirm_password)
    {
        return res.redirect('back');
    }
    
    User.findOne({email:req.body.email},function(err,user){
        if(err)
        {
            console.log('error in finding user');
            return;
        }

        if(!user)
        {
            User.create(req.body,function(err,user)
            {
                if(err)
                {
                    console.log('error in creating user');
                }

                return res.render('sign_in',{
                    title:'Sign-in'
            });
            })
        }
        else{
            res.redirect('back');
        }
    });
}
module.exports.createSession= function(req,res)
{
    //later
    return res.redirect('/');
}