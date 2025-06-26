import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


const connectDB = async () => {
    try{
        mongoose.connection.on("connected", () => console.log("Database Connected"))
        await mongoose.connect(`${process.env.MONGODB_URL}/blonja`)
    }catch{
        console.log(console.error.message);
        
    }
}

export default connectDB;





