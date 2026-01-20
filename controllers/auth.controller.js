import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/user.model.js"
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js"

export const register = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try{
        const { name, email, password } = req.body;

        // Check if user already exists
        const existing=await User.findOne({ email });
        if(existing){
            const error = new Error("User already exists with this email");
            error.statusCode = 400;
            throw error;
        }

        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUsers=await User.create([{
            name,
            email,
            password: hashedPassword
        }],{session});

        const token = jwt.sign(
            { userId: newUsers[0]._id },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
          );
          
        res.status(201).json({
            success:true,
            message:"User registered successfully",
            data:{
                token,
                user:newUsers[0],
            }
        })
        await session.commitTransaction();
    }
    catch(error){
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if(!user){
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            const error = new Error("Invalid password");
            error.statusCode = 401;
            throw error;
        }

        const token= jwt.sign(
            { userId: user._id },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        res.status(200).json({
            success:true,
            message:"User logged in successfully",
            data:{
                token,
                user,
            }
        })
    } catch (error) {
        next(error);
    }
}

export const logout = async (req, res, next) => {
    try{
        // For JWT, logout is handled on client side by deleting the token.
        res.status(200).json({
            success:true,
            message:"User logged out successfully",
        })
    }
    catch(error){
        next(error);
    }
}