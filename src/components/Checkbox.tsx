import { styled } from "@mui/system";
import { getFiltersWithUpdatedCheckboxValues } from "../functions/getFiltersWithUpdatedCheckboxValues";
import { ActiveFilter } from "../interfaces/ActiveFilter";

type Props = {
  value: {
    name: string;
    isActive: boolean;
  };
  activeFilter: ActiveFilter;
  setActiveFilters: Function;
};

const Label = styled("label")({
  display: "block",
  paddingTop: "5px",
  paddingBottom: "5px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

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
