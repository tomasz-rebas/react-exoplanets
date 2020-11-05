import React, { useEffect, useState } from 'react';
import buildQuery from '../functions/buildQuery';
import csvToObject from '../functions/csvToObject';
import tableColumns from '../tableColumns.json';

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

    const corsProxy = 'https://cors-anywhere.herokuapp.com/';

    // const tableColumns = [
    //     ['pl_name', 'Planet Name'],
    //     ['hostname', 'Host Name'],
    //     ['disc_facility', 'Discovery Facility'],
    //     ['discoverymethod', 'Discovery Method'],
    //     ['disc_year', 'Discovery Year'],
    //     ['pl_orbper', 'Orbital Period'],
    //     ['pl_orbsmax', 'Orbit Semi-Major Axis [au]'],
    //     ['pl_masse', 'Planet Mass'],
    //     ['pl_rade', 'Planet Radius [Earth Radius]'],
    //     ['pl_dens', 'Planet Density [g/cm**3]'],
    //     ['releasedate', 'Release Date']
    // ];

    useEffect(() => {
        fetch(`${corsProxy}https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=${buildQuery(tableColumns, true)}&format=csv`)
        .then(response => response.text())
        .then(data => {
            const convertedData = csvToObject(data);
            console.log(convertedData);
            setPlanetaryData(convertedData);
        })
        .catch(error => {
            console.error('The error occured. ' + error);
        });
    }, []);

    return (
        <div>Hello world!</div>
    )
}