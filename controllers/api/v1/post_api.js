const Post= require('../../../models/post');
const Comment= require('../../../models/comment');

module.exports.index= async function(req,res){

    let posts= await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path:'comments',
        populate:({
            path:'user'
        })
    });
    return res.json(200,{
        message:'post api guyss',
        posts:posts
    });
}

module.exports.destroy= async function(req,res)
{
    try{
       
            let post= await Post.findById(req.params.id);
            console.log(post.user);
            console.log(req.user.id);
            if(post.user==req.user.id){
            post.remove();
            await Comment.deleteMany({post:req.params.id});
            return res.json(200,{
                message:'delete post and comment associated with it'
            });
        }else{
            return res.json(401,{
                message:'Unauthorized access'
            })
        }
    
    }catch(err){
           return res.json(500,{
            message:'Internal Server Error'
        });
    }
}