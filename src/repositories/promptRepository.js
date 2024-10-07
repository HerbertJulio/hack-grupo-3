import { queriesSQL } from "../queries/queriesSQL.js";
import { getDatabase } from "../config/database.js";

/**
 * Repository class for handling database queries related to prompts.
 */
class PromptRepository {
  constructor(dbName) {
    this.dbName = dbName;
  }

  /**
   * Executes all predefined queries and returns the formatted results.
   * Also writes the results to a file.
   * @async
   * @returns {Promise<string>} A string containing all formatted query results.
   */
  async executeQuery() {
    const db = await getDatabase(this.dbName);
    const results = await Promise.all(
      Object.entries(queriesSQL).map(
        async ([key, { query, title, description }]) => {
          try {
            const { data } = await db.query([query]);
            const formattedData = this.formatTableData(data);
            return { title, description, data: formattedData };
          } catch (error) {
            console.error(`Error executing query "${title}":`, error);
            return { title, data: `Error retrieving data: ${error.message}` };
          }
        }
      )
    );

    const formattedPrompts = results
      .map(
        ({ title, data, description }) =>
          `${title}:\n${description}\n${JSON.stringify(data, null, 2)}`
      )
      .join("\n\n");

    return formattedPrompts;
  }

  formatTableData(data) {
    return data.results.flatMap((result) =>
      result.rows.map((row) =>
        row
          .map((value, index) => `${result.columns[index]}: ${value}`)
          .join(", ")
      )
    );
  }
}

export default PromptRepository;
