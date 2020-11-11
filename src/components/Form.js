import React from 'react';
import tableColumns from '../tableColumns.json';

export default function Form( { planetaryData } ) {

    let inputs;

    tableColumns.forEach(element => {
        if (element.usedInForm) {
            if (element.dataType === 'text') {
                let labels = [];
                planetaryData.forEach(planet => {
                    if (!labels.includes(planet[element.databaseColumnName])) {
                        labels.push(planet[element.databaseColumnName]);
                    }
                });
                console.log(labels);
            } else if (element.dataType === 'number') {
                console.log('This is number.');
            }
        }
    });

    return (
        <form>Form</form>
    );
}