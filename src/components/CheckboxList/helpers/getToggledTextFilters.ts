import { ActiveFilter } from "../../../types/ActiveFilter";
import { ActiveFilterValue } from "../../../types/ActiveFilterValue";

const isEachFilterActive = (values: ActiveFilterValue[]): boolean =>
  !values.some((value) => !value.isActive);

// Select/Unselect All
export const getToggledTextFilters = (
  previousState: ActiveFilter[],
  name: string
): ActiveFilter[] =>
  previousState.map((filter) =>
    filter.name === name && filter.values
      ? {
          ...filter,
          values: filter.values.map((value) => ({
            ...value,
            isActive: !isEachFilterActive(filter.values as ActiveFilterValue[]),
          })),
        }
      : filter
  );
