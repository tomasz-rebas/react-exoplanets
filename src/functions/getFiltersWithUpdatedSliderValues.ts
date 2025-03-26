import { ActiveFilter } from "../interfaces/ActiveFilter";

export default function getFiltersWithUpdatedSliderValues(
  filters: ActiveFilter[],
  newCurrentMin: number,
  newCurrentMax: number,
  name: string
): ActiveFilter[] {
  return filters.map((filter) => {
    if (filter.name === name) {
      return {
        ...filter,
        currentMinValue: newCurrentMin,
        currentMaxValue: newCurrentMax,
      };
    }

    return filter;
  });
}
