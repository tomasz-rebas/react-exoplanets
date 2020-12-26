import { ActiveFilterValue } from './ActiveFilterValue';

export interface ActiveFilter {
    name?: string,
    tableLabel?: string,
    dataType?: string,
    minValue?: number,
    maxValue?: number,
    values?: ActiveFilterValue[]
}