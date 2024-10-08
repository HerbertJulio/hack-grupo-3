import { promptDefault } from "../config/querys";
import { getAzionDatabaseDocuments } from "./azionService";
import { OpenAI } from "openai";

class PromptService {
  private dbName: string;
  private openai: OpenAI;

  constructor(dbName: string) {
    this.dbName = dbName;
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async streamPromptResponse(messages: any) {
    try {
      const context = await getAzionDatabaseDocuments(this.dbName);

      if (messages.length > 1) {
        messages.shift();
      }

      const openaiStream: any = await this.openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `${promptDefault} respond only about this context: ${context}`,
          },
          ...messages,
        ],
      });

      return openaiStream;
    } catch (error: any) {
      console.error("Error in streamPromptResponse:", error);
      throw error;
    }
  }
}

export default PromptService;
