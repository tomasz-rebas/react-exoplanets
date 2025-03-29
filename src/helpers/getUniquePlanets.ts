import { Entry } from "../types/Entry";

// This function will remove some of the entries so only one entry
// per planet will remain - the one with most recent release date.

export const getUniquePlanets = (data: Entry[]): Entry[] =>
  Object.values(
    data.reduce((acc, entry) => {
      if (!acc[entry.pl_name]) {
        acc[entry.pl_name] = entry;

        return acc;
      }

      const accDate = new Date(acc[entry.pl_name].releasedate);
      const entryDate = new Date(entry.releasedate);

      if (entryDate > accDate) {
        acc[entry.pl_name] = entry;
      }

      return acc;
    }, {} as Record<string, Entry>)
  );
