const User= require('../models/user');
const Post= require('../models/post');



module.exports.profile= function(req,res){
    User.findById(req.params.id,function(err,users){
        if(err)
        {
            console.log('error in finding user for profile');
        }
        console.log(users);
        return res.render('profile',{
            title:'Profile',
            curr_user:users
    });
    });

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

module.exports.endSession= function(req,res)
{
    req.logout();
    return res.redirect('/');
}

module.exports.post= function(req,res)
{
    console.log(req.body);
    Post.create({
        content: req.body.post_data
    },
    function(err,post)
    {
        if(err)
        {
            console.log('error in creating post');
        }
        return res.redirect('/');

    });
    
}

// module.exports.update= function(req,res)
// {
//     if(req.params.id==)
// }