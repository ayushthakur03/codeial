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

                res.redirect('/');
            }
 }catch(err){
     console.log('error in creating comment');
 }
        
}

module.exports.destroy= async function(req,res)
{
    try{
        let comment= await Comment.findById(req.params.id);
      

        if(comment.user==req.user.id){
        await Post.findByIdAndUpdate(comment.post, {$pull:{comments:req.params.id}});
        
         comment.remove();
         return res.redirect('back');
        }
        else{
            return res.redirect('back');
        }
    }catch(err){
        console.log('error in deleting posts');
        return;
    }
}

