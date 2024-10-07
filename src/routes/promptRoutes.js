import express from "express";
import PromptController from "../controllers/promptController.js";

const router = express.Router();

const promptController = new PromptController();

router.post("/chat", promptController.handlePromptRequest);

export default router;
