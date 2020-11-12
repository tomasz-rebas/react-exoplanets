import React from 'react';

export default function PlanetList( { planetaryData }) {

    let planets = [];

    for (let i = 0; i < 100; i++) {
        planets.push(
            <div>
                {planetaryData[i].pl_name}
            </div>
        )
    }

    return (
        <div>{planets}</div>
    );
}