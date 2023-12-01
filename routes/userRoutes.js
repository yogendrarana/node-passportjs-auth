import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// register
router.get("/profile", authMiddleware, (req, res) => res.render('profile'));

export default router;