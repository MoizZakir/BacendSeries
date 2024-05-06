import express from "express";
import dotenv from 'dotenv'
import { authRoutes } from "./routes/AuthRoutes/Auth.js";
import { dbConnection } from "./utils/config.js";

const app=express();
dotenv.config()



app.use(express.json())
app.use('/api/Auth',authRoutes)
dbConnection()

app.listen(process.env.PORT,()=>{
console.log("server started at port =>>" ,process.env.PORT)
})