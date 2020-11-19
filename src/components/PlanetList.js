import React from 'react';
import PlanetCard from './PlanetCard';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    main: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap'
    }
});

export default function PlanetList( { planetaryData }) {

    const classes = useStyles();

    let planets = [];

    for (let i = 0; i < 100; i++) {
        console.log(planetaryData[i]);
        planets.push(
            // <div key={planetaryData[i].pl_name}>
            //     {planetaryData[i].pl_name}
            // </div>
            <PlanetCard data={planetaryData[i]}/>
        )
    }

    return (
        <main className={classes.main}>{planets}</main>
    );
}