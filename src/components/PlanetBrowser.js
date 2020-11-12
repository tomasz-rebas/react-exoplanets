import React from 'react';
import Form from './Form';
import PlanetList from './PlanetList';

export default function PlanetBrowser( { planetaryData } ) {
    return (
        <main>
            <Form planetaryData={planetaryData}/>
            <PlanetList/>
        </main>
    );
}