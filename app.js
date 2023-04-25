import express from "express";
import "express-async-errors";
import cors from "cors";
import helmet from "helmet";
import audioRouter from "./router/audioRouter.js";
import authRouter from "./router/authRouter.js";
import cardRouter from "./router/cardRouter.js";
import csvRouter from "./router/csvRouter.js";
import groupRouter from "./router/groupRouter.js";
import { config } from "./config.js";

const app = express();

app.use(express.json());
app.use(express.text());
app.use(cors());
app.use(helmet());

app.use("/auth", authRouter);
app.use("/audio", audioRouter);
app.use("/csv", csvRouter);

app.use("/cards", cardRouter);
app.use("/groups", groupRouter);

app.listen(config.server.port, () => {
  console.log("server is running..");
});
