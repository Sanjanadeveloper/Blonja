import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


const connectDB = async () => {
    try{
        mongoose.connection.on("connected", () => console.log("Database Connected"))
        await mongoose.connect(`${process.env.MONGODB_URL}/blonja`)
    }catch(error){
        console.log("Failed to connect DB",error.message);
        
    }
}

export default connectDB;





