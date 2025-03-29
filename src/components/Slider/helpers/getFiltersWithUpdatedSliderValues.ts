import { ActiveFilter } from "../../../types/ActiveFilter";

export const getFiltersWithUpdatedSliderValues = (
  filters: ActiveFilter[],
  newCurrentMin: number,
  newCurrentMax: number,
  name: string
): ActiveFilter[] =>
  filters.map((filter) => {
    if (filter.name === name) {
      return {
        ...filter,
        currentMinValue: newCurrentMin,
        currentMaxValue: newCurrentMax,
      };
    }

    return filter;
  });
