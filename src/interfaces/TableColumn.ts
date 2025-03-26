export interface TableColumn {
  databaseColumnName: string;
  tableLabel: string;
  description: string;
  isUsedInQuery: boolean;
  usedInForm: boolean;
  dataType: string;

  minValue?: number;
  maxValue?: number;
  scaleStep?: number;
  unit?: string;
}
