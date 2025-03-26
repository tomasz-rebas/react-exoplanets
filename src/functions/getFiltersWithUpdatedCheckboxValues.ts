import { ActiveFilter } from "../interfaces/ActiveFilter";
import { ActiveFilterValue } from "../interfaces/ActiveFilterValue";

export const getFiltersWithUpdatedCheckboxValues = (
  activeFilter: any,
  name: string,
  filters: ActiveFilter[]
): ActiveFilter[] =>
  filters.map((filter) => {
    if (filter.name === activeFilter.name) {
      return {
        ...activeFilter,
        values: activeFilter.values.map((checkbox: ActiveFilterValue) => {
          if (checkbox.name === name) {
            return {
              ...checkbox,
              isActive: !checkbox.isActive,
            };
          }

          return checkbox;
        }),
      };
    }

    return filter;
  });
