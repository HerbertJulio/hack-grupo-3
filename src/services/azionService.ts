import { createClient } from "azion/sql";
import { queriesSQL } from "../config/querys";

const client = createClient({
  token: process.env.AZION_TOKEN as string,
});

export const getAzionDatabaseDocuments = async (
  dbName: string
): Promise<any> => {
  try {
    const { data: db, error }: any = await client.getDatabase(dbName);
    if (error) {
      throw new Error(`Error fetching database: ${error.message}`);
    }

    try {
      const { listQueries, listQueryDetails } = Object.values(
        queriesSQL
      ).reduce<{
        listQueries: string[];
        listQueryDetails: { title: string; description: string }[];
      }>(
        (acc, { query, title, description }) => {
          acc.listQueries.push(query);
          acc.listQueryDetails.push({ title, description });
          return acc;
        },
        { listQueries: [], listQueryDetails: [] }
      );

      const { data } = await db.query(listQueries);

      const formattedData = formatTableData(data, listQueryDetails);
      return formattedData;
    } catch (error) {
      throw error;
    }
  } catch (error: any) {
    console.error(`Failed to fetch database ${dbName}:`, error);
    throw error;
  }
};

const formatTableData = (data: any, listQueryDetails: any) => {
  return data.results.map((result: any, index: number) => {
    const { title, description } = listQueryDetails[index];
    return (
      `${title}: \n ${description} \n ` +
      result.rows
        .map((row: any) => {
          return row
            .map((value: any, index: number) => {
              const columnName = result.columns[index];
              return `${columnName}: ${value}`;
            })
            .join(", ");
        })
        .join(" \n ")
    );
  });
};
