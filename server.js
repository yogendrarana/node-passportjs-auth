import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/database.js";

// create express instance
const app = express();

// env
dotenv.config({path: './.env'})

// connect to MongoDB
connectDB();

// middlewares
app.use(cors());
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// listen on port 8000
app.listen(8000, () => {
    console.log("Server started on port 8000");
});
