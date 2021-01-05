import React, { useEffect } from 'react';
import tableColumns from '../tableColumns.json';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';

import { Entry } from '../interfaces/Entry';
import { ActiveFilter } from '../interfaces/ActiveFilter';
import { ActiveFilterValue } from '../interfaces/ActiveFilterValue';

import roundValue from '../functions/roundValue';

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
    label: {
        display: 'block',
        paddingTop: '5px',
        paddingBottom: '5px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
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

    const handleCheckboxChange = (activeFilter: any) => (event: any) => {
        console.log('handleCheckboxChange triggered');
        const { name } = event.target;
        setActiveFilters((previousState: ActiveFilter[]) => 
            previousState.map(previousFilter => {
                if (previousFilter.name === activeFilter.name && previousFilter.values !== undefined) {
                    return {
                        ...activeFilter,
                        values: activeFilter.values.map((checkbox: ActiveFilterValue) => {
                            if (checkbox.name === name) {
                                return {
                                    ...checkbox,
                                    isActive: !checkbox.isActive
                                }
                            } else {
                                return checkbox;
                            }
                        })
                    }
                } else {
                    return previousFilter;
                }
            })
        );
    }

    const handleSliderChange = (name: string) => (event: any, value: number | number[]) => {
        if (Array.isArray(value)) {
            const newCurrentMin = value[0];
            const newCurrentMax = value[1];
            console.log('newCurrentMin = ' + newCurrentMin + ' and newCurrentMax = ' + newCurrentMax);
            setActiveFilters((previousState: ActiveFilter[]) => 
                previousState.map(filter => {
                    if (filter.name === name) {
                        return {
                            ...filter,
                            currentMinValue: newCurrentMin,
                            currentMaxValue: newCurrentMax
                        }
                    } else {
                        return filter;
                    }
                })
            );
        }
    }

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
                <label 
                    key={index}
                    className={classes.label}
                >
                    <input 
                        type="checkbox"
                        name={value.name}
                        checked={value.isActive}
                        onChange={handleCheckboxChange(activeFilter)}
                    />
                    {value.name}
                </label>
            );

            inputs.unshift(
                <div key={name + '_label'} className="input-container">
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

        } else if (dataType === 'number') {

            const firstMiddleMark = (maxValue - minValue) / 3;
            const secondMiddleMark = 2 * firstMiddleMark;
            const marks = [
                {
                    value: minValue,
                    label: minValue + ' ' + (unit ? unit : '')
                },
                {
                    value: firstMiddleMark,
                    label: roundValue(firstMiddleMark.toString()) + ' ' + (unit ? unit : '')
                },
                {
                    value: secondMiddleMark,
                    label: roundValue(secondMiddleMark.toString()) + ' ' + (unit ? unit : '')
                },
                {
                    value: maxValue,
                    label: maxValue + ' ' + (unit ? unit : '')
                }
            ];

            inputs.push(
                <div key={name + '_label'}>
                    <h4>
                        {tableLabel}
                        {unit ? ' [' + unit + ']' : ''}
                    </h4>
                    <Slider
                        defaultValue={[currentMinValue, currentMaxValue]}
                        valueLabelDisplay="auto"
                        step={scaleStep}
                        marks={marks}
                        min={minValue}
                        max={maxValue}
                        onChangeCommitted={handleSliderChange(name)}
                    />
                </div>
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