import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    fetchAlert: {
        textAlign: 'center'
    }
});

export default function FetchAlert( { didFetchFail } ) {

    const classes = useStyles();
    
    return (
        <div className={classes.fetchAlert}>
            {
                didFetchFail ?
                <div>
                    <p>Error occured when fetching data.</p>
                    <p>Please reload and try again.</p> 
                </div> :
                <div>
                    <p>Fetching data.</p> 
                    <p>Please wait...</p>
                    <CircularProgress/>
                </div>
            }
        </div>
    );
}