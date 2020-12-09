import React, { useState } from 'react';
import PlanetCard from './PlanetCard';
import Paging from './Paging';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    main: {
        paddingTop: '100px'
    },
    planetList: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        paddingTop: '20px',
        paddingBottom: '20px'
    }
});

export default function PlanetList( { planetaryData, activeFilters }) {

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(24);

    const classes = useStyles();

    function shouldBeFilteredOut(data) {

        let shouldBeFilteredOut = false;

        activeFilters.forEach(property => {
            if (data.[property.name] < property.minValue || data.[property.name] > property.maxValue) {
                shouldBeFilteredOut = true;
            } else if (property.values) {
                property.values.forEach(checkbox => {
                    if (checkbox.name === data.[property.name] && !checkbox.isActive) {
                        shouldBeFilteredOut = true;
                    }
                });
            }
        });

        return shouldBeFilteredOut;
    }

    let planetaryDataAfterFiltering = planetaryData.filter(element => !shouldBeFilteredOut(element));

    // console.log('planetaryData = ' + planetaryData.length);
    // console.log('planetaryDataAfterFiltering = ' + planetaryDataAfterFiltering.length);

    const numberOfPages = parseInt(planetaryDataAfterFiltering.length / itemsPerPage + 1);

    let planets = [];

    for (let i = (currentPage - 1) * itemsPerPage; i < currentPage * itemsPerPage; i++) {
        if (i < planetaryDataAfterFiltering.length) {
            planets.push(
                <PlanetCard 
                    data={planetaryDataAfterFiltering[i]}
                    key={planetaryDataAfterFiltering[i].pl_name + '_' + i}
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