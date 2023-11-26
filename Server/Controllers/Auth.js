import express from 'express'
import User from '../Modals/User.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import AuthenticateToken from '../Middleware/AuthenticateUser.js';
const Auth = express();

const accessKey = process.env.JWT_ACCESS;


Auth.post('/signup' , async(req,res)=>{

      const {name , email , password} = req.body;
    try {
        const ExistingUser = await User.findOne({email:email});
        if(ExistingUser){
            res.status(200).json({valid:false});
        }
        else{
       
            const hashedPassword = await bcrypt.hash(password,6);
          const user =  await User.create({
                name:name,
                email:email,
                password:hashedPassword
            })
            const ExistingUser = {
                _id:user._id,
                name:name,
                email:email,
                password:hashedPassword
            }
            const accessToken = jwt.sign({ExistingUser}, accessKey, { expiresIn: "2d" });

            
            res.status(200).json({ access:accessToken, valid:true , info:ExistingUser});

        }

     
        
    } catch (error) {
        console.log(error)
    }
} )



Auth.post('/login' ,async(req,res)=>{

    const {password , email} = req.body;


    try {
     
        const ExistingUser = await User.findOne({email:email});

        if(!ExistingUser){
            res.status(200).json({valid:false});
        }
        else{
            bcrypt.compare(password, ExistingUser.password, function(err, response) {
                if (err){
                  console.log(err)
                }
                if (response) {
                    const accessToken = jwt.sign({ExistingUser}, accessKey, { expiresIn: "2d" });
                    res.status(200).json({ access:accessToken, valid:true , info:ExistingUser});
                } else {
                    res.status(200).json({  valid:false});
    
                }
              });
        }
        
    

        
    } catch (error) {
        console.log(error)
    }



})


Auth.get('/Token' , AuthenticateToken , async(req,res)=>{
    
    const user = req.user ;
    try {
       res.status(200).json({valid:true , Userdata:user.ExistingUser});
    } catch (error) {
        console.logI(error)
    }


} )


export default Auth

