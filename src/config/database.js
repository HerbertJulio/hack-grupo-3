import { createClient } from "azion/sql";

const client = createClient({
  token: process.env.TOKEN_AZION,
  debug: process.env.DEBUG === "true",
});

export const getDatabase = async (dbName) => {
  try {
    const { data: db, error } = await client.getDatabase(dbName);
    if (error) {
      throw new Error(`Error fetching database: ${error.message}`);
    }
    return db;
  } catch (error) {
    console.error(`Failed to fetch database ${dbName}:`, error);
    throw error;
  }
};
