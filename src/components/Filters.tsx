import React, { useEffect } from 'react';
import tableColumns from '../tableColumns.json';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';

import { Entry } from '../interfaces/Entry';
import { ActiveFilter } from '../interfaces/ActiveFilter';
import { ActiveFilterValue } from '../interfaces/ActiveFilterValue';

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

    let inputs: React.ReactNode[] = [];
    // let filterSettings = [];

    tableColumns.forEach(element => {

        if (element.usedInForm) {

            if (element.dataType === 'text') {

                let labels: string[] = [];
                let checkboxValues = [];

                planetaryData.forEach(planet => {
                    if (!labels.includes(planet[element.databaseColumnName])) {
                        labels.push(planet[element.databaseColumnName]);
                        checkboxValues.push({
                            name: planet[element.databaseColumnName],
                            isActive: true
                        });
                    }
                });

                let checkboxes = labels.map((label, index) =>
                    <label 
                        key={element.databaseColumnName + '_' + index}
                        className={classes.label}
                    >
                        <input 
                            type="checkbox"
                            name={label}
                            defaultChecked={true}
                            onChange={event => {  
                                const { name } = event.target;
                                setActiveFilters((previousState: ActiveFilter[]) => 
                                    previousState.map(filter => {
                                        if (filter.name === element.databaseColumnName && filter.values !== undefined) {
                                            return {
                                                name: filter.name,
                                                values: filter.values.map((checkbox: ActiveFilterValue) => {
                                                    if (checkbox.name === name) {
                                                        return {
                                                            name: checkbox.name,
                                                            isActive: !checkbox.isActive
                                                        }
                                                    } else {
                                                        return checkbox;
                                                    }
                                                })
                                            }
                                        } else {
                                            return filter;
                                        }
                                    })
                                );
                            }}
                        />
                        {label}
                    </label>
                );

                inputs.unshift(
                    <div key={element.databaseColumnName + '_label'} className="input-container">
                        <h4>{element.tableLabel}</h4>
                        <div>{checkboxes}</div>
                        <Button 
                            variant="contained"
                            className={classes.selectAllButton}
                        >
                            Select All
                        </Button>
                    </div>
                );

                // filterSettings.push({
                //     name: element.databaseColumnName,
                //     values: checkboxValues
                // });
            } 

            else if (element.dataType === 'number') {

                const min = element.minValue;
                const max = element.maxValue;

                if (min !== undefined && max !== undefined) {
                    inputs.push(
                        <div key={element.databaseColumnName + '_label'}>
                            <h4>
                                {element.tableLabel}
                                {element.unit ? ' [' + element.unit + ']' : ''}
                            </h4>
                            <Slider
                                defaultValue={[min, max]}
                                // onChange={}
                                valueLabelDisplay="auto"
                                // aria-labelledby=""
                                // getAriaValueText={}
                                step={element.scaleStep}
                                min={min}
                                max={max}
                                onChangeCommitted={(event, value: number | number[]) => {
                                    if (Array.isArray(value)) {
                                        const newMin = value[0];
                                        const newMax = value[1];
                                        setActiveFilters((previousState: ActiveFilter[]) => 
                                            previousState.map(filter => {
                                                if (filter.name === element.databaseColumnName) {
                                                    return {
                                                        name: filter.name,
                                                        minValue: newMin,
                                                        maxValue: newMax
                                                    }
                                                } else {
                                                    return filter;
                                                }
                                            })
                                        );
                                    }
                                }}
                            />
                        </div>
                    );
                }
                
                // filterSettings.push({
                //     name: element.databaseColumnName,
                //     minValue: min,
                //     maxValue: max
                // });
            }
        }
    });

    /*useEffect(() => {
        setActiveFilters(filterSettings);
    }, []);*/ // eslint-disable-line react-hooks/exhaustive-deps

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