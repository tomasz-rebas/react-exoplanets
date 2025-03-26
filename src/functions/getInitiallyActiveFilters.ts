import { ActiveFilter } from "../interfaces/ActiveFilter";
import { ActiveFilterValue } from "../interfaces/ActiveFilterValue";
import { Entry } from "../interfaces/Entry";
import { TableColumn } from "../interfaces/TableColumn";

export const getInitiallyActiveFilters = (
  planetaryData: Entry[],
  tableColumns: TableColumn[]
): ActiveFilter[] =>
  tableColumns
    .filter((column) => column.usedInForm)
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

      let values: ActiveFilterValue[] = [];

      planetaryData.forEach((entry) => {
        let isInArray = false;
        values.forEach((value) => {
          if (value.name === entry[databaseColumnName]) {
            isInArray = true;
          }
        });
        if (!isInArray) {
          values.push({
            name: entry[databaseColumnName],
            isActive: true,
          });
        }
      });

      return {
        name: databaseColumnName,
        tableLabel,
        dataType,
        values,
      };
    });
