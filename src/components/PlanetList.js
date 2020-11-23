import React from 'react';
import PlanetCard from './PlanetCard';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';

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

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(24);

    const classes = useStyles();
    const numberOfPages = parseInt(planetaryData.length / itemsPerPage + 1);
    let planets = [];

    for (let i = (currentPage - 1) * itemsPerPage; i < currentPage * itemsPerPage; i++) {
        //console.log(planetaryData[i]);
        if (i < planetaryData.length) {
            planets.push(
                <PlanetCard 
                    data={planetaryData[i]}
                    key={planetaryData[i].pl_name}
                />
            )
        }
    }

    return (
        <main>
            <div className={classes.planetList}>{planets}</div>
            <Pagination 
                count={numberOfPages}
                color="primary"
                size="large"
                onChange={(event, page) => {
                    setCurrentPage(page);
                    console.log(planetaryData.length);
                }}
            />
        </main>
    );
}