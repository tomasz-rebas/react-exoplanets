import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    toolbar: {
        justifyContent: 'flex-end'
    }
});

export default function Header() {

    const classes = useStyles();

    return (
        <AppBar>
            <Toolbar className={classes.toolbar}>
                <h3>Exoplanets Archive</h3>
                {/* <p>Browse through hundreds of exoplanets discovered in the last decades. Adjust form parameters for specific results.</p> */}
            </Toolbar>
        </AppBar>
    );
}