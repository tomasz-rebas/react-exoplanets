import React from 'react';
import tableColumns from '../tableColumns.json';

export default function Form( { planetaryData } ) {

    let inputs = [];

    tableColumns.forEach(element => {
        if (element.usedInForm) {
            let input;
            if (element.dataType === 'text') {
                let labels = [];
                planetaryData.forEach(planet => {
                    if (!labels.includes(planet[element.databaseColumnName])) {
                        labels.push(planet[element.databaseColumnName]);
                    }
                });
                console.log(labels);
                let checkboxes = labels.map((label, index) =>
                    <label key={element.databaseColumnName + '_' + index}>
                        <input type="checkbox" name={label}/>
                        {label}
                    </label>
                );
                inputs.unshift(
                    <div key={element.databaseColumnName + '_label'}>
                        <hr/>
                        <h4>{element.tableLabel}</h4>
                        <div className="checkboxes-container">{checkboxes}</div>
                    </div>
                );
            } else if (element.dataType === 'number') {
                inputs.push(
                    <div key={element.databaseColumnName + '_label'}>
                        <hr/>
                        <h4>{element.tableLabel}</h4>
                        <input type="number"/>
                    </div>
                );
            }
        }
    });

    return (
        <form>{inputs}</form>
    );
}