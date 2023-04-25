import express from "express";
import * as csvController from "../controllers/csvController.js";
import { isAuth } from "../middleware/auth.js";
import { corsConfig } from "../middleware/cors.js";

const csvRouter = express.Router();

csvRouter.post("/upload", isAuth, csvController.upload);
csvRouter.post("/save", isAuth, csvController.save);

export default csvRouter;
