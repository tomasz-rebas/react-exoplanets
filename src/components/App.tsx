import React, { useEffect, useState } from 'react';

import getQuery from '../functions/getQuery';
import convertCsvToObject from '../functions/convertCsvToObject';
import getUniquePlanets from '../functions/getUniquePlanets';
import getInitiallyActiveFilters from '../functions/getInitiallyActiveFilters';

import tableColumns from '../tableColumns.json';
import fallbackData from '../fallbackData.json';

import Header from './Header';
import Filters from './Filters';
import PlanetList from './PlanetList';
import FetchAlert from './FetchAlert';
import Footer from './Footer';

import { Entry } from '../interfaces/Entry';
import { ActiveFilter } from '../interfaces/ActiveFilter';

export default function App() {

    const [planetaryData, setPlanetaryData] = useState<Array<Entry>>();
    const [didFetchFail, setDidFetchFail] = useState<boolean>(false);
    const [isSidebarOpened, setIsSidebarOpened] = useState<boolean>(false);
    const [activeFilters, setActiveFilters] = useState<Array<ActiveFilter>>();

    const corsProxy = 'https://cors-anywhere.herokuapp.com/';

    // Test only. Will be removed in the final version.
    const isInDevelopment = false;

    useEffect(() => {
        if (isInDevelopment) {
            setTimeout(() => {
                setPlanetaryData(fallbackData);
            }, 1000);
        } else {
            const url = `${corsProxy}https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=${getQuery(tableColumns, true)}&format=csv`;
            console.log(`Fetching data from: ${url}`);
            fetch(url)
            .then(response => response.text())
            .then(data => {
                const convertedData = convertCsvToObject(data);
                const strippedData = getUniquePlanets(convertedData);
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

    useEffect(() => {
        if (planetaryData) {
            setActiveFilters(
                getInitiallyActiveFilters(planetaryData, tableColumns)
            );
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
                isSidebarOpened={isSidebarOpened}
                setIsSidebarOpened={setIsSidebarOpened}
                activeFilters={activeFilters}
                setActiveFilters={setActiveFilters}
            />
            <PlanetList 
                planetaryData={planetaryData}
                activeFilters={activeFilters}
                tableColumns={tableColumns}
            />
            <Footer/>
        </div> :
        <FetchAlert didFetchFail={didFetchFail}/>
    )
}