import express from "express";
import * as audioController from "../controllers/audioController.js";

const audioRouter = express.Router();

audioRouter.get("/:word", audioController.getAudio);

export default audioRouter;
