import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import passport from "passport";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import { connectDB } from "./config/database/database.js";
import ErrorMiddleware from "./middlewares/errorMiddleware.js";
import { initializeLocalStrategy } from "./config/passport/localStrategy.js";

// import routes
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

// create express instance
const app = express();

// env
dotenv.config({ path: './.env' })

// connect to MongoDB
connectDB();

// passport-js strategy
initializeLocalStrategy();

// middlewares
app.use(cors());
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// expressSession should be used before passport.session() and passport.initialize()
app.use(expressSession({ secret: "secret", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());


// register view engine
app.set("view engine", "ejs"); //required
app.set("views", "views"); //optional

// routes for views
app.get("/", (_, res) => res.render('home'))
app.get("/login", (_, res) => res.render('login'))
app.get("/register", (_, res) => res.render('register'))
app.get("/dashboard", (_, res) => res.render('dashboard'))

// routes for api
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/admin", adminRoutes);

// listen on port 8000
app.listen(8000, () => {
    console.log("Server started on port 8000");
});

// error middleware
app.use(ErrorMiddleware);