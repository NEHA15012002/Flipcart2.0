const User= require('../models/user');
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