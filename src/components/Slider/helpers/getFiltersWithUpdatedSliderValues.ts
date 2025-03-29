import { ActiveFilter } from "../../../types/ActiveFilter";

export const getFiltersWithUpdatedSliderValues = (
  filters: ActiveFilter[],
  newCurrentMin: number,
  newCurrentMax: number,
  name: string
): ActiveFilter[] =>
  filters.map((filter) =>
    filter.name === name
      ? {
          ...filter,
          currentMinValue: newCurrentMin,
          currentMaxValue: newCurrentMax,
        }
      : filter
  );
