const mongoose= require('mongoose');
const multer= require('multer');
const path= require('path');
const POST_PATH= path.join('/uploads/posts/post_img');

const postSchema= new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Comment'
        }
    ],
    post_img:{
        type:String
    }

},{
    timestamps:true
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',POST_PATH));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })

postSchema.statics.uploadedImg=multer({storage:storage}).single('post_img');
postSchema.statics.imgPath= POST_PATH;
const Post= mongoose.model('Post',postSchema);

module.exports= Post;