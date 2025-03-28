import { Entry } from "../types/Entry";

export const parseCsvToObject = (text: string): Entry[] => {
  const rows = text.split(/\r?\n/);
  const keys = rows[0].split(",");

  return rows
    .slice(1) // Once keys are defined, the first row is redundant
    .filter((row) => row) // In case the last row is empty
    .map((row) => {
      const values = row.split(",");

      return Object.fromEntries(
        // Strip the value from double quotes
        keys.map((key, index) => [key, values[index].replace(/["]+/g, "")])
      ) as Entry;
    });
};
