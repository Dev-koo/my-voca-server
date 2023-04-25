import express from "express";
import * as authController from "../controllers/authController.js";
import { isAuth } from "../middleware/auth.js";

const authRouter = express.Router();

// POST /auth/signup
authRouter.post("/signup", authController.signup);

// POST /auth/login
authRouter.post("/login", authController.login);

// GET /auth/me
authRouter.get("/me", isAuth, authController.me);

export default authRouter;
