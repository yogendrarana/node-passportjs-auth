import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import morgan from "morgan";
import express from "express";
import passport from "passport";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/database/database.js";
import ErrorMiddleware from "./middlewares/errorMiddleware.js";
import sessionMiddleware from "./middlewares/sessionMiddleware.js";
import { initializeLocalStrategy } from "./config/passport/localStrategy.js";
import { initializeGoogleOauth2Strategy } from "./config/passport/googleOauth2Strategy.js";


// import routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";


// create express instance
const app = express();
const server = http.createServer(app);


// env
dotenv.config({ path: './.env' })


// config
connectDB();
initializeLocalStrategy();
initializeGoogleOauth2Strategy();


// middlewares
app.use(cors());
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}


// use expressSession before passport.session() and passport.initialize()
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());


// register view engine
app.set("view engine", "ejs"); //required
app.set("views", "views"); //optional


// routes for views
app.get("/", (_, res) => res.render('home'))
app.get("/login", (_, res) => res.render('login'))
app.get("/register", (_, res) => res.render('register'))
app.get("/profile", (_, res) => res.render('profile'))


// routes for api
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);


// listen on port 8000
server.listen(8000, () => {
    console.log("Server started on port 8000");
});


// error middleware
app.use(ErrorMiddleware);