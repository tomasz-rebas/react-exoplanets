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

    return (
        <Card 
            variant="outlined"
            className={classes.card}
        >
            {data.pl_name}
        </Card>
    );
}