import getRoundedValue from '../functions/getRoundedValue';

export default function getSliderMarks(minValue: number, maxValue: number, unit: string) {

    const firstMiddleMark = (maxValue - minValue) / 3;
    const secondMiddleMark = 2 * firstMiddleMark;

    return [
        {
            value: minValue,
            label: minValue + ' ' + (unit ? unit : '')
        },
        {
            value: firstMiddleMark,
            label: getRoundedValue(firstMiddleMark.toString()) + ' ' + (unit ? unit : '')
        },
        {
            value: secondMiddleMark,
            label: getRoundedValue(secondMiddleMark.toString()) + ' ' + (unit ? unit : '')
        },
        {
            value: maxValue,
            label: maxValue + ' ' + (unit ? unit : '')
        }
    ];
}