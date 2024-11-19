import getToggledTextFilters from "../functions/getToggledTextFilters";
import { ActiveFilter } from "../interfaces/ActiveFilter";
import { Button } from "@mui/material";
import { styled } from "@mui/system";

type Props = {
  tableLabel: string;
  name: string;
  checkboxes: JSX.Element[];
  setActiveFilters: Function;
};

const SelectAllButton = styled(Button)({
  marginTop: "15px",
});

const InputContainer = styled("div")({
  paddingTop: "10px",
  paddingBottom: "10px",
});

export default function CheckboxList({
  tableLabel,
  name,
  checkboxes,
  setActiveFilters,
}: Props) {
  const selectAllCheckboxes = () => {
    setActiveFilters((previousState: ActiveFilter[]) =>
      getToggledTextFilters(previousState, name)
    );
  };

  return (
    <InputContainer>
      <h4>{tableLabel}</h4>
      <div>{checkboxes}</div>
      <SelectAllButton variant="contained" onClick={selectAllCheckboxes}>
        Select All
      </SelectAllButton>
    </InputContainer>
  );
}
