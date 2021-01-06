import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

type Props = {
    tableLabel: string,
    checkboxes: JSX.Element[]
}

const useStyles = makeStyles({
    selectAllButton: {
        marginTop: '15px'
    }
});

export default function CheckboxList ( { tableLabel, checkboxes }: Props ) {
    const classes = useStyles();
    return (
        <div className="input-container">
            <h4>{tableLabel}</h4>
            <div>{checkboxes}</div>
            <Button 
                variant="contained"
                className={classes.selectAllButton}
            >
                Select All
            </Button>
        </div>
    );
}