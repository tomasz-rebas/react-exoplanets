import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

export default function Header() {
    return (
        <AppBar>
            <Toolbar>
                <h3>Exoplanets Archive</h3>
                <p>Browse through hundreds of exoplanets discovered in the last decades. Adjust form parameters for specific results.</p>
            </Toolbar>
        </AppBar>
    );
}