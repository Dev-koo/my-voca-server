import express from "express";
import * as groupController from "../controllers/groupController.js";
import { isAuth } from "../middleware/auth.js";

const groupRouter = express.Router();

groupRouter.get("/", isAuth, groupController.getGroups);
groupRouter.post("/", isAuth, groupController.createGroup);
groupRouter.delete("/:id", isAuth, groupController.removeGroup);

export default groupRouter;
