import { getToggledTextFilters } from "./helpers/getToggledTextFilters";
import { ActiveFilter } from "../../types/ActiveFilter";
import { InputContainer, SelectAllButton } from "./CheckboxList.theme";
import { Dispatch, SetStateAction } from "react";

type Props = {
  tableLabel: string;
  name: string;
  checkboxes: JSX.Element[];
  setActiveFilters: Dispatch<SetStateAction<ActiveFilter[]>>;
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
