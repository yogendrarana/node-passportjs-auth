import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        const { connection } = await mongoose.connect("mongodb://27017/test");
        console.log(`Database connected with ${connection.host}`);
    }catch(err){
        console.log("Error:", err.message);
    }
}