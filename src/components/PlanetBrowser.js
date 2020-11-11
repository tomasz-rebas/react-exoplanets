import React from 'react';
import Form from './Form';

export default function PlanetBrowser( { planetaryData } ) {
    return (
        <main>
            <Form planetaryData={planetaryData}/>
        </main>
    );
}