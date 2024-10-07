import PromptService from "../services/promptService.js";

class PromptController {
  constructor() {
    this.dbName = process.env.DB_NAME;
    this.promptService = new PromptService(this.dbName);
  }

  handlePromptRequest = async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    try {
      const dbResponse = await this.promptService.getPromptResponse(prompt);
      return res.json({ response: dbResponse });
    } catch (error) {
      console.error("Error handling prompt request:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
}

export default PromptController;
