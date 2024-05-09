import express from "express";
import dotenv from 'dotenv'
import { authRoutes } from "./routes/AuthRoutes/Auth.js";
import { dbConnection } from "./utils/config.js";
import cookieParser from'cookie-parser'
import jwt from 'jsonwebtoken'



const app=express();
dotenv.config()

app.use(cookieParser())


app.use(express.json())
dbConnection()
app.use('/api/Auth',authRoutes)


app.use((req,res,next)=>{
    const date=Date.now()
    const currentDate = Math.floor(date / 1000) 
    console.log(currentDate)
    const token=req.cookies.token;
    
    try {
        const isValid=jwt.verify(token,process.env.SECRET)
        console.log('DECODE DATA===   ',isValid)
        if(currentDate<isValid.exp){
            
            next()

        }
        else{
            
            console.log('DECODE DATA===   ',isValid)
            res.send("token Expired")
        }
    } catch (error) {
        res.send('invalid token')
        
    }
 
    

})
app.get('/api/home',(req,res)=>{
    res.send('wecome in home')
    console.log("welcome in home")
    console.log(req.cookies.token)



})

app.listen(process.env.PORT,()=>{
console.log("server started at port =>>" ,process.env.PORT)
})