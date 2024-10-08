import PromptService from "../services/promptService";

class PromptController {
  private dbName: string;
  private promptService: PromptService;

  constructor() {
    this.dbName = process.env.DB_NAME || "";
    this.promptService = new PromptService(this.dbName);
  }

  handlePromptRequest = async (c: any) => {
    const { messages } = await c.req.json();

    if (!messages.length) {
      return c.json({ error: "Prompt is required" }, 400);
    }

    try {
      const responseOpenAI = await this.promptService.streamPromptResponse(
        messages
      );
      return c.json(responseOpenAI);
    } catch (error) {
      console.error("Error handling prompt request:", error);
      return c.json({ error: "Internal server error" }, 500);
    }
  };
}

export default PromptController;
