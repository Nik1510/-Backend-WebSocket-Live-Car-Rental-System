import jwt from "jsonwebtoken";
import { User } from "../db/model.db";

export const  userMiddleware =  async (req,res,next)=>{
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({
                success:false,
                message:"Authorization token is missing"
            })
        }
        const token = authHeader.split(" ")[1];
        const verify = await jwt.verify(token,process.env.secretPassword);
        if(!verify){
            return res.status(401).json({
                success:false,
                message:"InValid token"
            })
        }
        req.userId=verify.userId;
        next();
    } catch (error) {
        return res.status(500).json({
            message:"internal error",
            success:false,
        })
    }
}