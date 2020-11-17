import React from 'react';
import PlanetList from './PlanetList';

export default function PlanetBrowser( { planetaryData } ) {
    return (
        <main>
            <PlanetList planetaryData={planetaryData}/>
        </main>
    );
}