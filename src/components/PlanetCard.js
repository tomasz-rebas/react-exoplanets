import React from 'react';
import Card from '@material-ui/core/Card';

export default function PlanetCard( { data } ) {
    return (
        <Card>{data.pl_name}</Card>
    );
}