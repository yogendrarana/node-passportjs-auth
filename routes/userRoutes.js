import express from "express";
import passport from "passport";
import { authMiddleware } from "../middlewares/authMiddlewareLocalStrategy.js";

const router = express.Router();

// register
router.get("/profile", authMiddleware, (req, res) => res.redirect('/profile'));

export default router;