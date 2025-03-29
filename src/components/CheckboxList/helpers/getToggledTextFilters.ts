import { ActiveFilter } from "../../../types/ActiveFilter";
import { ActiveFilterValue } from "../../../types/ActiveFilterValue";

const isEachFilterActive = (values: ActiveFilterValue[]): boolean =>
  values.reduce((acc, value) => {
    if (!value.isActive) {
      acc = false;
    }

    return acc;
  }, true);

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
