import { Router } from "express";
import { signupController } from "../../controllers/authControllers/signup.js";
const authRoutes=Router();


//for signup
authRoutes.post('/signup',signupController)
export {authRoutes}