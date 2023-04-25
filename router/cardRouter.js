import express from "express";
import * as cardController from "../controllers/cardController.js";
import { isAuth } from "../middleware/auth.js";

const cardRouter = express.Router();

// Search Card
cardRouter.get("/", isAuth, cardController.getAllByUserId);

// Create Card
cardRouter.post("/", isAuth, cardController.cardCreate);

// Update Card
cardRouter.put("/:id", isAuth, cardController.cardUpdate);

// Delete Card
cardRouter.delete("/:id", isAuth, cardController.cardRemove);

// Random Card
cardRouter.get("/random", isAuth, cardController.random);

export default cardRouter;
