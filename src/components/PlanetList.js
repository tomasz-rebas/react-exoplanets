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

export default function PlanetList( { planetaryData, filters }) {

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(24);

    const classes = useStyles();

    function shouldBeFilteredOut(data) {
        //console.log(data);
        filters.forEach(property => {
            //console.log(property);
            if (data.[property.name] >= property.minValue && data.[property.name] <= property.maxValue) {
                return false;
            } else if (property.values) {
                property.values.forEach(checkbox => {
                    if (checkbox.name === data.[property.name] && checkbox.isChecked) {
                        return false;
                    }
                });
            } else {
                return true;
            }
        });
    }

    const numberOfPages = parseInt(planetaryData.length / itemsPerPage + 1);
    let planets = [];

    for (let i = (currentPage - 1) * itemsPerPage; i < currentPage * itemsPerPage; i++) {
        if (i < planetaryData.length && !shouldBeFilteredOut(planetaryData[i])) {
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