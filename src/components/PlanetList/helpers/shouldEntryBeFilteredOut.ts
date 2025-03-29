import { Entry } from "../../../types/Entry";
import { ActiveFilter } from "../../../types/ActiveFilter";

export const shouldEntryBeFilteredOut = (
  data: Entry,
  filters: ActiveFilter[]
): boolean =>
  filters.some(({ name, currentMinValue, currentMaxValue, values }) => {
    if (
      currentMinValue !== undefined &&
      currentMaxValue !== undefined &&
      (parseFloat(data[name]) < currentMinValue ||
        parseFloat(data[name]) > currentMaxValue)
    ) {
      return true;
    }

    return values?.some(
      (checkbox) => checkbox.name === data[name] && !checkbox.isActive
    );
  });
