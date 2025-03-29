import { ActiveFilterValue } from "./ActiveFilterValue";
import { EntryKey } from "./Entry";

export interface ActiveFilter {
  name?: EntryKey;
  tableLabel?: string;
  dataType?: string;
  minValue?: number;
  maxValue?: number;
  currentMinValue?: number;
  currentMaxValue?: number;
  values?: ActiveFilterValue[];
  unit?: string;
  scaleStep?: number;
}
