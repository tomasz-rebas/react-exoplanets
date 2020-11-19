import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    card: {
        width: '200px',
        height: '300px',
        margin: '10px'
    }
});

export default function PlanetCard( { data } ) {

    const classes = useStyles();

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
            {pl_name}
        </Card>
    );
}