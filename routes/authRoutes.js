import express from "express";
import passport from "passport";
import * as authControllers from "../controllers/authControllers.js";

const router = express.Router();

// register
router.post("/login", passport.authenticate('local', { failureRedirect: '/login' }), authControllers.loginUser);
router.post("/register", authControllers.registerUser);
router.get("/logout", authControllers.logoutUser);

export default router;