import { EntryKey } from "./Entry";

export interface TableColumn {
  databaseColumnName: EntryKey;
  tableLabel: string;
  description: string;
  isUsedInQuery: boolean;
  isUsedInForm: boolean;
  dataType: string;

  minValue?: number;
  maxValue?: number;
  scaleStep?: number;
  unit?: string;
}
