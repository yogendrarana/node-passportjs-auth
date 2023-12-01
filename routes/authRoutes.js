import express from "express";
import passport from "passport";
import * as authControllers from "../controllers/authControllers.js";

const router = express.Router();

// register
router.post("/login", passport.authenticate("local", { successRedirect: '/' }), authControllers.loginUser);
router.post("/register", authControllers.registerUser);

export default router;