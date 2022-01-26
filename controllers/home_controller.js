const Post= require('../models/post');
const User= require('../models/user');

module.exports.home= function(req,res){
    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:({
            path:'user'
        })
    })
    .exec(function(err,post){

        if(err){
            console.log('error in finding posts');
            return;
        }
        
    User.find({},function(err,users)
    {
        return res.render('home',{
            title:'Home',
            posts:post,
            all_users:users
        });
    })

        
    });
};