import express from "express";
import dotenv from 'dotenv'
import { authRoutes } from "./routes/AuthRoutes/Auth.js";
import { dbConnection } from "./utils/config.js";
import cookieParser from'cookie-parser'
import jwt from 'jsonwebtoken'
import cors from 'cors'



const app=express();
dotenv.config()


app.use(cors( {
    origin: true, credentials: true}))

app.use(express.json())
app.use(cookieParser())
// cookieParser()
dbConnection()
app.use('/api/Auth',authRoutes)
let user;
// app.get('/api/check',(req,res)=>{
    
    //     console.log("welcome in check")
    //    return res.cookie('token','cdcdcd').status(200).json({status:true,data:'checked'})
    
    
    
    // })
    
    
app.use((req,res,next)=>{
    const date=Date.now()
    const currentDate = Math.floor(date / 1000) 
    console.log(currentDate)
    const token=req.cookies.token;
    console.log(token)
    
    try {
        const isValid=jwt.verify(token,process.env.SECRET)
        console.log('DECODE DATA===   ',isValid)
        if(currentDate<isValid.exp){
            // currentDate<
            user=isValid
            // res.header=isValid
            
            console.log('logincokiee  without err  ',token)
            
            next()
            
        }
        
    } catch (error) {
        console.log('logincokiee with error   ',token)
        // console.log(token)
        res.status(400).json({message:'invalid token',status:false})
        
    }
    
    
    
})
app.get('/api/home',(req,res)=>{
    res.status(200).json({status:true,data:user})
    console.log("welcome in home")
    console.log('hoem===>cookies',req.cookies.token)
    
    
    
})


app.listen(process.env.PORT,()=>{
console.log("server started at port =>>" ,process.env.PORT)
})
