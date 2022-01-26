const Comment= require('../models/comment');
const Post= require('../models/post');


module.exports.create=function(req,res)
{
    console.log('enetered function comment section');
    console.log(req.body.post);
    Post.findById(req.body.post,function(err,post)
    {
        if(err)
        {
            console.log('error in finding post');
            res.redirect('/');
        }
         if(post)
         {
             console.log('enetered create comment section');
            Comment.create({
                content: req.body.post_comment,
                user:req.user._id,
                post:req.body.post
            },
            function(err,comment)
            {
                if(err)
                {
                    console.log('error in creating comment');
                    return;
                }
            
                post.comments.push(comment);
                post.save();

                res.redirect('/');
        
            });
         }
         console.log('FAILED 1');
    });
    console.log('FAILED 2');
}

module.exports.destroy= function(req,res)
{
    Comment.findById(req.params.id,function(err,comment){
        if(err)
        {
            console.log('error in finding comment');
            return;
        }

        if(comment.user==req.user.id){
        Post.findByIdAndUpdate(comment.post, {$pull:{comments:req.params.id}},function(err,post)
        {
           console.log('cool');
            // post.comments me jaake us comment ki id delete karni hai
        });
        
         comment.remove();
         return res.redirect('back');
        }
        else{
            return res.redirect('back');
        }
    })
}

