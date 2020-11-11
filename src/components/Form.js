import React from 'react';
import tableColumns from '../tableColumns.json';

export default function Form( { planetaryData } ) {

    let inputs;

    tableColumns.forEach(element => {
        if (element.usedInForm) {
            if (element.dataType === 'text') {
                console.log('This is text.');
                console.log('This is ' + planetaryData[0].name);
                console.log('This is ' + planetaryData[1].name);
            } else if (element.dataType === 'number') {
                console.log('This is number.');
            }
        }
    });

    return (
        <form>Form</form>
    );
}