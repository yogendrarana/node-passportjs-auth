import express from "express";
import passport from "passport";
import * as authControllers from "../controllers/authControllers.js";

const router = express.Router();


// define routes
router.post("/login", passport.authenticate('local', { failureRedirect: '/login' }), authControllers.loginUser);
router.post("/register", authControllers.registerUser);
router.get("/logout", authControllers.logoutUser);

router.get("/google", passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get("/google/callback", passport.authenticate('google', { failureRedirect: "/", successRedirect: "/profile" }), (req, res) => res.redirect('/profile'));

export default router;