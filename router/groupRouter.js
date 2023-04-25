import express from "express";
import * as groupController from "../controllers/groupController.js";
import { isAuth } from "../middleware/auth.js";

const groupRouter = express.Router();

<<<<<<< Updated upstream
groupRouter.get("/", isAuth, groupController.getGroup);
=======
groupRouter.get("/", isAuth, groupController.getGroups);
>>>>>>> Stashed changes
groupRouter.post("/", isAuth, groupController.createGroup);
groupRouter.delete("/:id", isAuth, groupController.removeGroup);

export default groupRouter;
