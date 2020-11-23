import React from 'react';
import PlanetCard from './PlanetCard';
import Paging from './Paging';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';

const useStyles = makeStyles({
    main: {
        paddingTop: '100px'
    },
    planetList: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap'
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
        <main className={classes.main}>        
            <Paging
                numberOfPages={numberOfPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
            <div className={classes.planetList}>{planets}</div>        
            <Paging
                numberOfPages={numberOfPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </main>
    );
}