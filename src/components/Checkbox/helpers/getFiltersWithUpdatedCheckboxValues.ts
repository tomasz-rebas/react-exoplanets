import { ActiveFilter } from "../../../types/ActiveFilter";
import { ActiveFilterValue } from "../../../types/ActiveFilterValue";

// Update a single checkbox
export const getFiltersWithUpdatedCheckboxValues = (
  activeFilter: any,
  name: string,
  filters: ActiveFilter[]
): ActiveFilter[] =>
  filters.map((filter) =>
    filter.name === activeFilter.name
      ? {
          ...activeFilter,
          values: activeFilter.values.map((checkbox: ActiveFilterValue) =>
            checkbox.name === name
              ? {
                  ...checkbox,
                  isActive: !checkbox.isActive,
                }
              : checkbox
          ),
        }
      : filter
  );
