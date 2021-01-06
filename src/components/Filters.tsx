import React, { useEffect } from 'react';
import tableColumns from '../tableColumns.json';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';

import Checkbox from '../components/Checkbox';
import CheckboxList from '../components/CheckboxList';
import Slider from '../components/Slider';

import { Entry } from '../interfaces/Entry';
import { ActiveFilter } from '../interfaces/ActiveFilter';

type Props = {
    planetaryData: Entry[], 
    isSidebarOpened: boolean, 
    setIsSidebarOpened: Function, 
    activeFilters: ActiveFilter[], 
    setActiveFilters: Function
}

const useStyles = makeStyles({
    drawerPaper: {
        padding: '20px',
        width: '600px'
    },
    inputContainer: {
        paddingTop: '10px',
        paddingBottom: '10px'
    },
    selectAllButton: {
        marginTop: '15px'
    }
});

export default function Filters({
    planetaryData,
    isSidebarOpened,
    setIsSidebarOpened,
    activeFilters,
    setActiveFilters
}: Props ) {

    const classes = useStyles();

    let inputs: React.ReactNode[] = [];
    // let filterSettings = [];

    activeFilters.forEach((activeFilter: any) => {

        const { 
            dataType,
            values,
            name,
            tableLabel,
            minValue,
            maxValue,
            unit,
            scaleStep,
            currentMinValue,
            currentMaxValue 
        } = activeFilter;

        if (dataType === 'text') {
            
            let checkboxes = values.map((value: any, index: number) =>
                <Checkbox
                    key={index}
                    value={value}
                    activeFilter={activeFilter}
                    setActiveFilters={setActiveFilters}
                />
            );

            inputs.unshift(
                <CheckboxList
                    key={name + '_label'}
                    tableLabel={tableLabel}
                    checkboxes={checkboxes}
                />
            );

        } else if (dataType === 'number') {

            inputs.push(
                <Slider
                    key={name + '_label'}
                    setActiveFilters={setActiveFilters}
                    currentMinValue={currentMinValue}
                    currentMaxValue={currentMaxValue}
                    scaleStep={scaleStep}
                    minValue={minValue}
                    maxValue={maxValue}
                    name={name}
                    unit={unit}
                    tableLabel={tableLabel}
                />
            );
        }
    });

    return (
        <Drawer 
            anchor="left"
            open={isSidebarOpened}
            onClose={() => {setIsSidebarOpened(!isSidebarOpened)}}
            classes={{
                paper: classes.drawerPaper
            }}
        >
            {inputs}
        </Drawer>
    );
}