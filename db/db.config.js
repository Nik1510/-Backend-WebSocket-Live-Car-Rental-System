import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();

export async function connect(){
    try {
        await mongoose.connect(process.env.MONGO_URL)
        const connection = mongoose.connection;
        connection.on("connected",()=>{
            console.log("connected to database");
        })
        connection.on("error",(err)=>{
            console.log("unable to connect to the data base",err);
            process.exit();
        })
    } catch (error) {
        console.log("Internal error",error)
    }
}