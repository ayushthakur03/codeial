const Comment= require('../models/comment');
const Post= require('../models/post');


module.exports.create= async function(req,res)
{
 try{
    let post= await Post.findById(req.body.post);
    if(post)
         {
             console.log('enetered create comment section');
             let comment= await Comment.create({
                content: req.body.post_comment,
                user:req.user._id,
                post:req.body.post
            });
            
                post.comments.push(comment);
                post.save();
                req.flash('success','Comment Created');

                res.redirect('/');
            }
 }catch(err){
    req.flash('error','Comment Created');
 }
        
}

module.exports.destroy= async function(req,res)
{
    try{
        let comment= await Comment.findById(req.params.id);
      

        if(comment.user==req.user.id){
        await Post.findByIdAndUpdate(comment.post, {$pull:{comments:req.params.id}});
        
         comment.remove();
         req.flash('success','Comment Deleted');
         return res.redirect('back');
        }
        else{
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error','Error in deleting comment');
        return;
    }
}

