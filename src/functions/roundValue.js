export default function roundValue(value) {

    let firstDigitIndex = null;
    let dotIndex = null;

    for (let i = 0; i < value.length; i++) {
        if (value[i] !== '0' && value[i] !== '.' && firstDigitIndex === null) {
            firstDigitIndex = i;
        } else if (value[i] === '.') {
            dotIndex = i;
        } else if (firstDigitIndex !== null && dotIndex !== null) {
            break;
        }
    }

    if (dotIndex === null) {
        // The number is an integer. No changes.
        return value;
    } else if (dotIndex > firstDigitIndex) {
        // The number is a float and is bigger than 1.
        if (value.length > dotIndex + 2) {
            return parseFloat(value.substring(0, dotIndex + 3));
        } else {
            return value;
        }
    } else if (firstDigitIndex > dotIndex) {
        // The number is a float and is smaller than 1.
        if (value.length > firstDigitIndex + 2) {
            return parseFloat(value.substring(0, firstDigitIndex + 2));
        } else {
            return value;
        }
    } else {
        return value;
    }
}