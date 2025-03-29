import { getFiltersWithUpdatedCheckboxValues } from "./helpers/getFiltersWithUpdatedCheckboxValues";
import { ActiveFilter } from "../../types/ActiveFilter";

import { Label } from "./Checkbox.theme";

type Props = {
  value: {
    name: string;
    isActive: boolean;
  };
  activeFilter: ActiveFilter;
  setActiveFilters: Function;
};

export const Checkbox = ({ value, activeFilter, setActiveFilters }: Props) => {
  const { name, isActive } = value;

  const handleCheckboxChange =
    (activeFilter: ActiveFilter) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const checkboxName = event.target.name;
      setActiveFilters((previousState: ActiveFilter[]) =>
        getFiltersWithUpdatedCheckboxValues(
          activeFilter,
          checkboxName,
          previousState
        )
      );
    };

  return (
    <Label>
      <input
        type="checkbox"
        name={name}
        checked={isActive}
        onChange={handleCheckboxChange(activeFilter)}
      />
      {name}
    </Label>
  );
};
