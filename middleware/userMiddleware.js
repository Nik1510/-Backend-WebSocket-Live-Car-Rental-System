import { User } from "../db/model.db";

export const  userMiddleware =  async (req,res,next)=>{
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startWith("Bearer ")){
            return res.status(404).json({
                success:false,
                message:"invalid entry"
            })
        }
    } catch (error) {
        
    }
}