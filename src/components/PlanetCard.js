import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import tableColumns from '../tableColumns.json';
import roundValue from '../functions/roundValue';

const useStyles = makeStyles({
    card: {
        width: '250px',
        padding: '10px',
        margin: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
    },
    planetIcon: {
        width: '70px',
        height: '70px'
    },
    dataRow: {
        marginTop: '4px',
        marginBottom: '4px'
    }
});

export default function PlanetCard( { data } ) {

    const classes = useStyles();
    
    // Prepare the data for display in a card.
    let dataForDisplay = [];
    for (const property in data) {
        for (let i = 0; i < tableColumns.length; i++) {
            if (tableColumns[i].databaseColumnName === property && 
                tableColumns[i].databaseColumnName !== 'pl_name') {
                let value;
                if (tableColumns[i].dataType === 'number') {
                    value = roundValue(data[property]);
                } else {
                    value = data[property];
                }
                
                const label = tableColumns[i].tableLabel;
                //const description = tableColumns[i].description;
                const unit = tableColumns[i].unit;
                dataForDisplay.push(
                    <div 
                        className={classes.dataRow}
                        key={label}
                    >
                        <strong>{label}: </strong>
                        <span>{value} {unit}</span>
                    </div>
                );
            }
        }
    }

    const { pl_dens, pl_name } = data;

    return (
        <Card 
            variant="outlined"
            className={classes.card}
        >
            <img
                /*src="https://www.flaticon.com/svg/static/icons/svg/1197/1197992.svg"*/
                src={pl_dens < 2 ? 'gas-giant.svg' : 'rocky-planet.svg'}
                className={classes.planetIcon}
                alt="Planet"
            />
            <h4>{pl_name}</h4>
            {dataForDisplay}
        </Card>
    );
}