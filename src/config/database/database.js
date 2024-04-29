import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const { connection } = await mongoose.connect("mongodb://localhost:27017/passportjs_auth");
        console.log(`Database connected with ${connection.host}`);
    } catch (err) {
        console.log("Error:", err.message);
    }
}