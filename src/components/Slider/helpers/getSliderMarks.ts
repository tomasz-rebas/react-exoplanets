import { getRoundedValue } from "../../../helpers/getRoundedValue";

interface SliderMark {
  value: number;
  label: string;
}

export const getSliderMarks = (
  minValue: number,
  maxValue: number,
  unit: string,
  isYear: boolean
): SliderMark[] => {
  let firstMiddleMark = (maxValue - minValue) / 3;
  let secondMiddleMark = 2 * firstMiddleMark;

  if (isYear) {
    firstMiddleMark += minValue;
    secondMiddleMark += minValue;

    firstMiddleMark = Math.trunc(firstMiddleMark);
    secondMiddleMark = Math.trunc(secondMiddleMark);
  }

  return [
    {
      value: minValue,
      label: minValue + " " + (unit ? unit : ""),
    },
    {
      value: firstMiddleMark,
      label: getRoundedValue(firstMiddleMark) + " " + (unit ? unit : ""),
    },
    {
      value: secondMiddleMark,
      label: getRoundedValue(secondMiddleMark) + " " + (unit ? unit : ""),
    },
    {
      value: maxValue,
      label: maxValue + " " + (unit ? unit : ""),
    },
  ];
};
