const jwt= require('jsonwebtoken');
const User= require('../../../models/user');

module.exports.createSession= async function(req,res){
    
        try{
            let user= await User.findOne({email:req.body.email});
            if(!user || user.password != req.body.password)
            {
                return res.json(422,{
                    message:'Invalid Credentails'
                });
            }
              return res.json(200,{
                  message:'Sign in Successful',
                  data:{
                      token: jwt.sign(user.toJSON(),'codeial', {expiresIn:'100000'})
                  }
              })
        
        }catch(err){
            return res.json(500,{
                message:'Unauthorized access'
            });
        }
   

        
    }
