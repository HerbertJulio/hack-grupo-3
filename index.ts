import { Hono } from "hono";

import { config } from "dotenv";
import PromptController from "./src/controllers/promptController";

config();
const app = new Hono();
const promptController = new PromptController();

app.post("/ai", promptController.handlePromptRequest);

app.fire();
