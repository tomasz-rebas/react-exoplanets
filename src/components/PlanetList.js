import React from 'react';
import PlanetCard from './PlanetCard';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    planetList: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginTop: '100px'
    }
});

export default function PlanetList( { planetaryData }) {

    const classes = useStyles();

    let planets = [];

    for (let i = 0; i < 50; i++) {
        console.log(planetaryData[i]);
        planets.push(
            <PlanetCard 
                data={planetaryData[i]}
                key={planetaryData[i].pl_name}
            />
        )
    }

    return (
        <main>
            <div className={classes.planetList}>{planets}</div>
            <Pagination 
                count={10}
                color="primary"
            />
        </main>
    );
}