import { ActiveFilterValue } from './ActiveFilterValue';

export interface ActiveFilter {
    name?: string,
    minValue?: number,
    maxValue?: number,
    values?: ActiveFilterValue[]
}