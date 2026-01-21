import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';
import User from '../models/user.model.js';
export const authorize = async (req, res, next) => {
    try {
        console.log('Authorization Header:', req.headers.authorization); // Add this
        
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        
        console.log('Extracted Token:', token); // Add this
        
        if(!token) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized access"
            });
        }

        // Verify token (implementation depends on the token strategy used)
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log('Decoded:', decoded); // Add this
        
        const user = await User.findById(decoded.userId).select('-password');

        if(!user) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized access"
            });
        }
        req.user = user; 
        next();
    } catch (error) {
        console.error('Auth Error:', error); // Add this
        res.status(401).json({
            success: false,
            message: "Unauthorized access",
            error: error.message
        });
    }
};