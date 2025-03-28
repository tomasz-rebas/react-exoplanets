import React from "react";

import Checkbox from "../Checkbox/Checkbox";
import CheckboxList from "../CheckboxList/CheckboxList";
import Slider from "../Slider";

import { ActiveFilter } from "../../interfaces/ActiveFilter";
import { StyledDrawer } from "./Filters.theme";

type Props = {
  isSidebarOpened: boolean;
  setIsSidebarOpened: Function;
  activeFilters: ActiveFilter[];
  setActiveFilters: Function;
};

export default function Filters({
  isSidebarOpened,
  setIsSidebarOpened,
  activeFilters,
  setActiveFilters,
}: Props) {
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
}
