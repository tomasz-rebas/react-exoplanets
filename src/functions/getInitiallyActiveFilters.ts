import { ActiveFilter } from "../interfaces/ActiveFilter";
import { ActiveFilterValue } from "../interfaces/ActiveFilterValue";
import { Entry } from "../interfaces/Entry";
import { TableColumn } from "../interfaces/TableColumn";

const getCheckboxValues = (
  data: Entry[],
  databaseColumnName: string
): ActiveFilterValue[] => {
  const uniqueValues = data.reduce((acc, entry) => {
    if (!acc.includes(entry[databaseColumnName])) {
      acc.push(entry[databaseColumnName]);
    }

    return acc;
  }, [] as string[]);

  return uniqueValues.map((value) => ({
    name: value,
    isActive: true,
  }));
};

export const getInitiallyActiveFilters = (
  planetaryData: Entry[],
  tableColumns: TableColumn[]
): ActiveFilter[] =>
  tableColumns
    .filter((column) => column.isUsedInForm)
    .map((column) => {
      const {
        tableLabel,
        dataType,
        databaseColumnName,
        minValue,
        maxValue,
        unit,
        scaleStep,
      } = column;

      if (column.dataType === "number") {
        return {
          tableLabel,
          dataType,
          name: databaseColumnName,
          minValue,
          maxValue,
          unit,
          scaleStep,
          currentMinValue: minValue,
          currentMaxValue: maxValue,
        };
      }

      const values = getCheckboxValues(planetaryData, databaseColumnName);

      return {
        name: databaseColumnName,
        tableLabel,
        dataType,
        values,
      };
    });
