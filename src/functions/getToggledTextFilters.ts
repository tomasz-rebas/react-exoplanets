import { ActiveFilter } from "../interfaces/ActiveFilter";

export const getToggledTextFilters = (
  previousState: ActiveFilter[],
  name: string
): ActiveFilter[] => {
  return previousState.map((filter) => {
    if (filter.name === name && filter.values) {
      let isEachFilterActive = true;

      filter.values.forEach((value) => {
        if (!value.isActive) {
          isEachFilterActive = false;
        }
      });

      let newValues;

      if (isEachFilterActive) {
        newValues = filter.values.map((value) => {
          return {
            ...value,
            isActive: false,
          };
        });
      } else {
        newValues = filter.values.map((value) => {
          if (value.isActive) {
            return value;
          } else {
            return {
              ...value,
              isActive: true,
            };
          }
        });
      }

      return {
        ...filter,
        values: newValues,
      };
    } else {
      return filter;
    }
  });
};
