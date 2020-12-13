import React, { useEffect, useState } from 'react';

import buildQuery from '../functions/buildQuery';
import csvToObject from '../functions/csvToObject';
import keepUniquePlanets from '../functions/keepUniquePlanets';

import tableColumns from '../tableColumns.json';
import fallbackData from '../fallbackData.json';

import Header from './Header';
import Filters from './Filters';
import PlanetList from './PlanetList';
import FetchAlert from './FetchAlert';
import Footer from './Footer';

import { Entry } from '../interfaces/Entry';
import { ActiveFilter } from '../interfaces/ActiveFilter';
import { ActiveFilterValue } from '../interfaces/ActiveFilterValue';

export default function App() {

    // https://cors-anywhere.herokuapp.com/

    // Info about API migration:
    // https://exoplanetarchive.ipac.caltech.edu/docs/transition.html

    // Documentation
    // https://exoplanetarchive.ipac.caltech.edu/docs/TAP/usingTAP.html
    // https://exoplanetarchive.ipac.caltech.edu/docs/API_PS_columns.html

    // https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+*+from+ps
    // https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+pl_name,pl_masse,ra,dec+from+ps
    // https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+pl_name,pl_masse,ra,dec+from+ps&format=csv
    // https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+column_name,description+from+TAP_SCHEMA.columns+where+table_name+like+'ps'&format=csv


    const [planetaryData, setPlanetaryData] = useState<Array<Entry>>();
    const [didFetchFail, setDidFetchFail] = useState<boolean>(false);
    const [isSidebarOpened, setIsSidebarOpened] = useState<boolean>(false);
    const [activeFilters, setActiveFilters] = useState<Array<ActiveFilter>>();

    const corsProxy = 'https://cors-anywhere.herokuapp.com/';
    const isInDevelopment = true;

    // Fetch the data.
    useEffect(() => {
        if (isInDevelopment) {
            setTimeout(() => {
                setPlanetaryData(fallbackData);
                // setActiveFilters([]);
            }, 1000);
        } else {
            const url = `${corsProxy}https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=${buildQuery(tableColumns, true)}&format=csv`;
            console.log(url);
            fetch(url)
            .then(response => response.text())
            .then(data => {
                const convertedData = csvToObject(data);
                const strippedData = keepUniquePlanets(convertedData);
                console.log(strippedData);
                setPlanetaryData(strippedData);
            })
            .catch(error => {
                console.error('The error occured. ' + error);
                setDidFetchFail(true);
                setPlanetaryData(fallbackData);
            });
        }
    }, [isInDevelopment]);

    // Initialize active filters' state.
    useEffect(() => {
        if (planetaryData) {
            let initiallyActiveFilters: ActiveFilter[] = [];
            tableColumns.forEach(element => {
                const { usedInForm, dataType, databaseColumnName, minValue, maxValue } = element;
                if (usedInForm) {
                    if (dataType === 'number') {
                        initiallyActiveFilters.push({
                            name: databaseColumnName,
                            minValue,
                            maxValue
                        });
                    } else {
                        let values: ActiveFilterValue[] = [];
                        planetaryData.forEach(entry => {
                            let isInArray = false;
                            values.forEach(value => {
                                if (value.name === entry[databaseColumnName]) {
                                    isInArray = true;
                                }
                            });
                            if (!isInArray) {
                                values.push({
                                    name: entry[databaseColumnName],
                                    isActive: true
                                });
                            }
                        });
                        initiallyActiveFilters.push({
                            name: databaseColumnName,
                            values
                        });
                    }
                }
            });
            setActiveFilters(initiallyActiveFilters);
        }
    }, [planetaryData]);

    return (
        planetaryData && activeFilters ?
        <div>
            <Header 
                isSidebarOpened={isSidebarOpened}
                setIsSidebarOpened={setIsSidebarOpened}
            />
            <Filters 
                planetaryData={planetaryData}
                isSidebarOpened={isSidebarOpened}
                setIsSidebarOpened={setIsSidebarOpened}
                activeFilters={activeFilters}
                setActiveFilters={setActiveFilters}
            />
            <PlanetList 
                planetaryData={planetaryData}
                activeFilters={activeFilters}
            />
            <Footer/>
        </div> :
        <FetchAlert didFetchFail={didFetchFail}/>
    )
}