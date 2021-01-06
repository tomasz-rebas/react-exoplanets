import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import getFiltersWithUpdatedCheckboxValues from '../functions/getFiltersWithUpdatedCheckboxValues';
import { ActiveFilter } from '../interfaces/ActiveFilter';

type Props = {
    value: {
        name: string,
        isActive: boolean
    }, 
    activeFilter: ActiveFilter,
    setActiveFilters: Function
}

const useStyles = makeStyles({
    label: {
        display: 'block',
        paddingTop: '5px',
        paddingBottom: '5px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    }
});

export default function Checkbox ( { value, activeFilter, setActiveFilters }: Props ) {

    const classes = useStyles();
    const { name, isActive } = value;
    
    const handleCheckboxChange = (activeFilter: any) => (event: any) => {
        const { name } = event.target;
        setActiveFilters((previousState: ActiveFilter[]) => 
            getFiltersWithUpdatedCheckboxValues(activeFilter, name, previousState)
        );
    }

    return (
        <label className={classes.label}>
            <input 
                type="checkbox"
                name={name}
                checked={isActive}
                onChange={handleCheckboxChange(activeFilter)}
            />
            {name}
        </label>
    )
}