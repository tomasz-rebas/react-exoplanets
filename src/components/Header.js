import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    toolbar: {
        justifyContent: 'space-between'
    }
});

export default function Header( { isSidebarOpened, setIsSidebarOpened } ) {

    const classes = useStyles();

    return (
        <AppBar>
            <Toolbar className={classes.toolbar}>
                    <Icon onClick={() => {setIsSidebarOpened(!isSidebarOpened)}}>menu</Icon>
                <h3>Exoplanets Archive</h3>
                {/* <p>Browse through hundreds of exoplanets discovered in the last decades. Adjust form parameters for specific results.</p> */}
            </Toolbar>
        </AppBar>
    );
}