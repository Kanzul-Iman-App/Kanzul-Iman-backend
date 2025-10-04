import jwt from 'jsonwebtoken'
import { User } from '../db/User.model.js'


const authMiddleware = async (req , res, next )=> {
    try {
        const authHeader = req.headers.authorization // bearer token
        if(!authHeader || !authHeader.startsWith("Bearer ") ){
            return res.status(401).json({
                message:"Unauthorized, token missing or invalid format"
            })
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decoded._id)
        if(!user) return res.status(401).json({
            message:'Unauthorised'
        })
        req.user = user 
        console.log('permission granted to the user to access the userProfile');
        
        next();
        
    } catch (error) {
        console.error('ERROR:', error)
        return res.status(500).json({
            message:'the server error detected . Please try again later'
        })
    }
}

export { authMiddleware }