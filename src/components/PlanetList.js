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
    const [itemsPerPage, setItemsPerPage] = useState(24);

    const classes = useStyles();

    function shouldBeFilteredOut(data) {
        //console.log(data);
        //console.log(activeFilters);

        let shouldBeFilteredOut = false;

        activeFilters.forEach(property => {
            if (data.[property.name] < property.minValue || data.[property.name] > property.maxValue) {
                shouldBeFilteredOut = true;
            } else if (property.values) {
                property.values.forEach(checkbox => {
                    if (checkbox.name === data.[property.name] && !checkbox.isChecked) {
                        shouldBeFilteredOut = true;
                    }
                });
            }
        });

        return shouldBeFilteredOut;
    }

    const numberOfPages = parseInt(planetaryData.length / itemsPerPage + 1);
    let planets = [];

    for (let i = (currentPage - 1) * itemsPerPage; i < currentPage * itemsPerPage; i++) {
        console.log(shouldBeFilteredOut(planetaryData[i]));
        if (i < planetaryData.length && !shouldBeFilteredOut(planetaryData[i])) {
            console.log(planetaryData[i].pl_name + " won't be filtered out.");
            planets.push(
                <PlanetCard 
                    data={planetaryData[i]}
                    key={planetaryData[i].pl_name}
                />
            )
        } else {
            console.log(planetaryData[i].pl_name + " will not appear.");
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