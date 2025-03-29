import React, { Dispatch, SetStateAction } from "react";

import { Checkbox } from "../Checkbox/Checkbox";
import { CheckboxList } from "../CheckboxList/CheckboxList";

import { ActiveFilter } from "../../types/ActiveFilter";
import { StyledDrawer } from "./Filters.theme";
import { Slider } from "../Slider/Slider";

type Props = {
  isSidebarOpened: boolean;
  setIsSidebarOpened: Dispatch<SetStateAction<boolean>>;
  activeFilters: ActiveFilter[];
  setActiveFilters: Dispatch<SetStateAction<ActiveFilter[]>>;
};

export const Filters = ({
  isSidebarOpened,
  setIsSidebarOpened,
  activeFilters,
  setActiveFilters,
}: Props) => {
  let inputs: React.ReactNode[] = [];

  activeFilters.forEach((activeFilter: any) => {
    const {
      dataType,
      values,
      name,
      tableLabel,
      minValue,
      maxValue,
      unit,
      scaleStep,
      currentMinValue,
      currentMaxValue,
    } = activeFilter;

    if (dataType === "text") {
      let checkboxes = values.map((value: any, index: number) => (
        <Checkbox
          key={index}
          value={value}
          activeFilter={activeFilter}
          setActiveFilters={setActiveFilters}
        />
      ));

      inputs.unshift(
        <CheckboxList
          key={name + "_label"}
          tableLabel={tableLabel}
          name={name}
          checkboxes={checkboxes}
          setActiveFilters={setActiveFilters}
        />
      );
    } else if (dataType === "number") {
      inputs.push(
        <Slider
          key={name + "_label"}
          setActiveFilters={setActiveFilters}
          currentMinValue={currentMinValue}
          currentMaxValue={currentMaxValue}
          scaleStep={scaleStep}
          minValue={minValue}
          maxValue={maxValue}
          name={name}
          unit={unit}
          tableLabel={tableLabel}
        />
      );
    }
  });

  return (
    <StyledDrawer
      anchor="left"
      open={isSidebarOpened}
      onClose={() => {
        setIsSidebarOpened(!isSidebarOpened);
      }}
    >
      {inputs}
    </StyledDrawer>
  );
};
