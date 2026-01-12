import express from express;
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import bodyParser from "body-parser";
import { authLogin, userSignup } from "./zod.validations";
import { User } from "./db/model.db";

const app = express();
app.use(bodyParser.json());
app.use(express.json())

app.post('/auth/signup', async(req,res)=>{
    try {
        const parsed = userSignup.safeParse(req.body);
        if(!parsed.success){
            return res.status(400).json({
                success:false,
                message:parsed.error.errors[0].message
            })
        }
        const {name,password,email,role} = parsed.data;
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                success:false,
                message:"duplicate email"
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = await User.create({
            name,
            password:hashedPassword,
            email,
            role
        });
        return res.status(200).json({
            success:false,
            data:{
                id:newUser._id,
                name:newUser._id,
                email:newUser.email,
                role:newUser.role,
            }
        })
    } catch (error) {
        console.log("Internal error",error)
    }
})

app.post('/auth/login', async(req,res)=>{
    const parsed = authLogin.safeParse(req.body);
    if(!parsed.success){
        return res.status(400).json({
            success:false,
            message:parsed.error.errors[0].message
        })
    }
    const {email,password} = parsed.data
    const user = await User.findOne({email})
    if(!user){
        return res.status(404).json({
            message:"email is not registered"
        })
    }
    const comparePassword = await bcrypt.compare(password,user.password)
    if(!comparePassword){
        return res.status(400).json({
            success:false,
            message:"Invalid Credentials",
        })
    }
    const token = await jwt.sign({
        userId:user._id,
        role:user.role
    },process.env.secretPassword,{expiresIn:'1h'})
    return res.status(200).json({
        success:true,
        message:"user logged in successful",
        data:{
            token
        }
    })
})



app.get('/auth/me',userMiddleware,async(req,res)=>{

})












app.listen(3000,()=>{
    console.log("app is running at port 3000")
})
