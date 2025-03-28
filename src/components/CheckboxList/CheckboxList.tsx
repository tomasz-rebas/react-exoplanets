import { getToggledTextFilters } from "../../functions/getToggledTextFilters";
import { ActiveFilter } from "../../interfaces/ActiveFilter";
import { InputContainer, SelectAllButton } from "./CheckboxList.theme";

type Props = {
  tableLabel: string;
  name: string;
  checkboxes: JSX.Element[];
  setActiveFilters: Function;
};

export const CheckboxList = ({
  tableLabel,
  name,
  checkboxes,
  setActiveFilters,
}: Props) => {
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
};
