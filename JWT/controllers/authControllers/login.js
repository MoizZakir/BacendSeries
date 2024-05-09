import users from '../../models/authModel/signupDB.js'
import jwt from 'jsonwebtoken'
import bycrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()
const loginController=async(req,res,next)=>{
    const {email,password}=req.body;
    const user=await users.findOne({email:email})
    // console.log(users)
    try {if(user){
        const validatePassword=await bycrypt.compare(password,user.password)
        if(validatePassword){
            const token =jwt.sign({
                email:email,
                createdOn:new Date().getTime()
                ,
            },process.env.SECRET,{
                expiresIn: 60,})
            res.cookie('token',token,{
                httpOnly:true,
                secure:true,
            })
            next()

            return res.json({
                status:400
                ,message:'loginSuccesfuly'
                ,data:user
            })}
            else{
                return res.json({
                    status:402
                    ,message:'password is incorect'
                    
                })
                
            }
        }
        else{
            return res.json({
                status:405,
                message:'invalidCredientials'
            })
        }
        
    } catch (error) {
        console.log(error)
        return res.json({
            message:'sytem Error',
            data:error
        })
        
    }
    
       
    }
    
    

export{loginController}