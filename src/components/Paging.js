import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    pagination: {
        display: 'flex',
        justifyContent: 'center'
    }
});

export default function Paging( { numberOfPages, currentPage, setCurrentPage }) {

    const classes = useStyles();

    return (
        <Pagination 
            count={numberOfPages}
            color="primary"
            size="large"
            onChange={(event, page) => {
                setCurrentPage(page);
            }}
            page={currentPage}
            className={classes.pagination}
        />
    )
}