import axios from "axios";
import PromptRepository from "../repositories/promptRepository.js";

export default class PromptService {
  constructor(dbName) {
    this.promptRepository = new PromptRepository(dbName);
  }

  async getPromptResponse(prompt) {
    try {
      const dbResponse = await this.promptRepository.executeQuery();

      if (!dbResponse || dbResponse.length === 0) {
        throw new Error("No response found for this prompt in the database");
      }
      const openAiResponse = await this.callOpenAiApi(prompt, dbResponse);
      return openAiResponse;
    } catch (error) {
      console.error("Error in getPromptResponse:", error);
      throw new Error(`Error processing prompt: ${error.message}`);
    }
  }

  async callOpenAiApi(prompt, dbResponse) {
    try {
      const response = await axios.post(
        process.env.OPENAI_API_URL,
        {
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: `As a Customer Success Manager, your goal is to evaluate the health of customer relationships based on product usage and platform configurations. Utilize the following data tables to analyze and derive insights regarding customer engagement and potential issues. 1.Edge Caching Usage (Table: edge_caching_usage) - Analyze the usage and reserved_capacity metrics for each client_id. Identify clients with low usage relative to their reserved capacity, indicating underutilization. 2. Status Code 500 (Table: status_code_500) - Examine the occurrence of HTTP status code 500 errors for each client_id. Determine if there are specific clients experiencing a high number of errors over time, which could signal technical issues affecting their experience. 3. Static Non-Hit Requests (Table: static_nonhit) - Review the total requests for each client_id in relation to upstream_cache_status. Identify trends where clients have a high rate of non-hit requests, indicating potential inefficiencies or misconfigurations in caching. - 4. WAF Counting and Blocking (Table: waf_counting_blocking) - Assess the waf_requests relative to requests for each client_id to understand the extent of web application firewall (WAF) intervention. Identify any clients frequently triggering WAF rules, which may affect their service experience.
Instructions: Compile your findings into a report highlighting the key metrics for each client. Provide recommendations for clients identified as having potential issues based on your analysis. Suggest proactive measures to improve customer engagement and satisfaction.`,
            },
            {
              role: "user",
              content: `${prompt}\n${dbResponse}`,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(`Error with OpenAI API: ${error.message}`);
    }
  }
}
