const Post= require('../models/post');
const Comment= require('../models/comment');
const passport= require('passport');



// module.exports.destroy= function(req,res)
// {
//     Post.findById(req.params.id, function(err,post)
//     {
//         if(err)
//         {
//             console.log('error in finding post');
//             return;
//         }

//         if(post.user==req.user.id)
//         {
//             post.remove();

//             Comment.deleteMany({post:req.params.id},function(err)
//             {
//                 if(err)
//                 {
//                     console.log('error in deleting comment from post');
//                     return;
//                 }

//                 return res.redirect('back');
//             })
//         }
//         else
//         {
//             return res.redirect('back');
//         }
//     }

//     );
// }

// module.exports.create= async function(req,res)
// {
    
//     try{
        
//          Post.uploadedImg(req,res,async function(err){
//              console.log(req.body);
//             console.log("%%%%");
//              let post= await Post.create({
//                 content: req.body.post_data,
//                 user:req.user._id,
//                 post_img:Post.imgPath + '/' + req.file.filename
//             });
         
//             console.log(post);
//             if(req.xhr){
//                 res.status(200).json({
//                     data:{
//                         post:post,
//                     }, 
//                     message:'post created successfully'
//                 });
//             }
//          })
 

  
//             return res.redirect('back');
//     }catch(err){
//         console.log('errrrr',err);
//         req.flash('error',err);
//         return;
//     }
     

// }

module.exports.create= function(req,res)
{
    console.log('enetered create post section');
   try{
    Post.uploadedImg(req,res,function(err)
    {
        console.log(req.body);
        Post.create({
            content: req.body.post_data,
            user:req.user._id,
            post_img:Post.imgPath+'/'+req.file.filename
        },
        function(err,post)
        {
            req.flash('success','Post Created Successfully');
            return res.redirect('back');
    
        });
    })
   }catch(err)
   {
       req.flash('error','Error in creating post');
       console.log(err.responseText);
   }
  
  
}

module.exports.destroy= async function(req,res)
{
    try{
        let post= await Post.findById(req.params.id);

        if(post.user==req.user.id)
        {
            post.remove();
            req.flash('success','Post Deleted');

            await Comment.deleteMany({post:req.params.id});

            if(req.xhr)
            {
                return res.status(200).json({
                    data:{
                        post_id: req.params.id
                    },
                    message:'Post Deleted'
                });
            }

                return res.redirect('back');
        }
        else
        {
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error','Cannot delete post');
    }
}
  


