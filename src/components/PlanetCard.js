import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import tableColumns from '../tableColumns.json';
import roundValue from '../functions/roundValue';

const useStyles = makeStyles({
    card: {
        padding: '10px',
        margin: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
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
                // dataForDisplay.push({
                //     value: data[property],
                //     label: tableColumns[i].tableLabel,
                //     description: tableColumns[i].description,
                //     unit: tableColumns[i].unit
                // });
                let value;
                if (tableColumns[i].dataType === 'number') {
                    value = roundValue(data[property]);
                } else {
                    value = data[property];
                }
                
                const label = tableColumns[i].tableLabel;
                const description = tableColumns[i].description;
                const unit = tableColumns[i].unit;
                dataForDisplay.push(
                    <div className={classes.dataRow}>
                        <strong>{label}: </strong>
                        <span>{value} {unit}</span>
                    </div>
                );
            }
        }
    }

    const {
        disc_facility,
        disc_year,
        discoverymethod,
        hostname,
        pl_dens,
        pl_masse,
        pl_name,
        pl_orbper,
        pl_orbsmax,
        pl_rade,
        releasedate
    } = data;

    return (
        <Card 
            variant="outlined"
            className={classes.card}
        >
            {
                pl_dens < 2 ?
                <img
                    /*src="https://www.flaticon.com/svg/static/icons/svg/3336/3336008.svg"*/
                    src="gas-giant.svg"
                    className={classes.planetIcon}
                /> :  
                <img
                    /*src="https://www.flaticon.com/svg/static/icons/svg/1197/1197992.svg"*/
                    src="rocky-planet.svg"
                    className={classes.planetIcon}
                />
            }
            <h4>{pl_name}</h4>
            {dataForDisplay}
        </Card>
    );
}