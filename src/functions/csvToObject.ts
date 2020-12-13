interface Entry {
    [key: string]: string | number
}

export default function csvToObject(text: string) {

    let rows = text.split(/\r?\n/);
    const keys = rows[0].split(',');

    // Once keys are defined, the first row is redundant.
    rows.shift();

    const convertedData = rows.map(row => {

        let newElement: Entry = {};
        const values = row.split(',');

        for (let i = 0; i < keys.length; i++) {
            // Value should be stripped of double quotes (unless it's undefined).
            let trimmedValue = values[i];
            if (trimmedValue) {
                trimmedValue = trimmedValue.replace(/['"]+/g, '');
            }
            newElement[keys[i]] = trimmedValue;
        }

        return newElement;
    });

    return convertedData;
}