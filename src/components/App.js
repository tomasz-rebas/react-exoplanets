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

    const [planetaryData, setPlanetaryData] = useState();
    const [didFetchFail, setDidFetchFail] = useState(false);
    const [isSidebarOpened, setIsSidebarOpened] = useState(false);

    const corsProxy = 'https://cors-anywhere.herokuapp.com/';

    useEffect(() => {
        /*const url = `${corsProxy}https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=${buildQuery(tableColumns, true)}&format=csv`;
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
            setDidFetchFail(true);*/
            setTimeout(() => {setPlanetaryData(fallbackData)}, 1000);
        /*});*/
    }, []);

    return (
        planetaryData ?
        <div>
            <Header 
                isSidebarOpened={isSidebarOpened}
                setIsSidebarOpened={setIsSidebarOpened}
            />
            <Filters 
                planetaryData={planetaryData}
                isSidebarOpened={isSidebarOpened}
                setIsSidebarOpened={setIsSidebarOpened}
            />
            <PlanetList planetaryData={planetaryData}/>
            <Footer/>
        </div> :
        <FetchAlert didFetchFail={didFetchFail}/>
    )
}