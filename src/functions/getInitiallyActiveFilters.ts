import { ActiveFilter } from "../interfaces/ActiveFilter";
import { ActiveFilterValue } from "../interfaces/ActiveFilterValue";
import { Entry } from "../interfaces/Entry";
import { TableColumn } from "../interfaces/TableColumn";

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

      const values: ActiveFilterValue[] = [];
      const seen = new Set();

      planetaryData.forEach((entry) => {
        const name = entry[databaseColumnName];

        if (!seen.has(name)) {
          seen.add(name);
          values.push({ name, isActive: true });
        }
      });

      return {
        name: databaseColumnName,
        tableLabel,
        dataType,
        values,
      };
    });
