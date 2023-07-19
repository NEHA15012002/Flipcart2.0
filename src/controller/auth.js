const User= require('../models/user');
const jwt=require('jsonwebtoken')

exports.signup=(req,res)=>{
       
    User.findOne({email:req.body.email}).then((user)=>{

        if(user){
         return res.status(400).json({message: 'User already exists'})
        }else{
         const newUser = new User({
             firstName:req.body.firstName,
             lastName:req.body.lastName,
             email:req.body.email,
             password:req.body.password,
             username: Math.random().toString(),});
     
             newUser.save()
             return res.status(200).json({msg:'User Created Successfully...'})
     
        }
         
    });
}

exports.signin=(req, res)=>{
    User.findOne({email:req.body.email}).then((user)=>{

        if(user){
            if(user.authenticate(req.body.paasword)){
             const token =jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'1h'});
             const {_id, firstName,lastName,email,role,fullName}=user
             res.status(200).json({
                 token,
                 user:{
                    _id, firstName,lastName,email,role,fullName
                 }
             });
 
         }else{
             return res.status(400).json({
                 message: 'Invalid Password'
             })
         }
        }else{
         return res.status(400).json({msg:"Something went wrong"});
        }


    });
}
   
       
       
    
    