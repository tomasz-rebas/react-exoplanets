import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    card: {
        width: '200px',
        height: '300px',
        margin: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    planetIcon: {
        width: '100px',
        height: '100px'
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
            {pl_name}
        </Card>
    );
}