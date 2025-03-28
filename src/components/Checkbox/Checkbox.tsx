import { getFiltersWithUpdatedCheckboxValues } from "../../functions/getFiltersWithUpdatedCheckboxValues";
import { ActiveFilter } from "../../interfaces/ActiveFilter";

import { Label } from "./Checkbox.theme";

type Props = {
  value: {
    name: string;
    isActive: boolean;
  };
  activeFilter: ActiveFilter;
  setActiveFilters: Function;
};

export default function Checkbox({
  value,
  activeFilter,
  setActiveFilters,
}: Props) {
  const { name, isActive } = value;

  const handleCheckboxChange = (activeFilter: any) => (event: any) => {
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
}
