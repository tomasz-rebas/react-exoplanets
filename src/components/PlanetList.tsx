import React, { useState } from 'react';
import PlanetCard from './PlanetCard';
import Paging from './Paging';
import { makeStyles } from '@material-ui/core/styles';

import { Entry } from '../interfaces/Entry';
import { ActiveFilter } from '../interfaces/ActiveFilter';

type Props = {
    planetaryData: Entry[],
    activeFilters: ActiveFilter[]
}

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

export default function PlanetList( { planetaryData, activeFilters }: Props) {

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(24);

    const classes = useStyles();

    function shouldBeFilteredOut(data: Entry) {

        let shouldBeFilteredOut = false;

        activeFilters.forEach(property => {
            const { name, currentMinValue, currentMaxValue, values } = property;
            if (name !== undefined && currentMinValue !== undefined && currentMaxValue !== undefined) {
                if (parseFloat(data[name]) < currentMinValue || parseFloat(data[name]) > currentMaxValue) {
                    shouldBeFilteredOut = true;
                } else if (values) {
                    values.forEach(checkbox => {
                        if (checkbox.name === data[name] && !checkbox.isActive) {
                            shouldBeFilteredOut = true;
                        }
                    });
                }
            }
        });

        return shouldBeFilteredOut;
    }

    const planetaryDataAfterFiltering = planetaryData.filter(element => !shouldBeFilteredOut(element));

    const numberOfPages = Math.floor(planetaryDataAfterFiltering.length / itemsPerPage + 1);

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