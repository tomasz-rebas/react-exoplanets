import React from 'react';
import tableColumns from '../tableColumns.json';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    drawerPaper: {
        padding: '20px'
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

export default function Filters( { planetaryData, isSidebarOpened, setIsSidebarOpened } ) {

    const classes = useStyles();

    let inputs = [];

    tableColumns.forEach(element => {
        if (element.usedInForm) {
            if (element.dataType === 'text') {
                let labels = [];
                planetaryData.forEach(planet => {
                    if (!labels.includes(planet[element.databaseColumnName])) {
                        labels.push(planet[element.databaseColumnName]);
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
                            defaultChecked="checked"
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
            } else if (element.dataType === 'number') {
                const min = element.minValue;
                const max = element.maxValue;
                inputs.push(
                    <div key={element.databaseColumnName + '_label'}>
                        <h4>{element.tableLabel}</h4>
                        <Slider
                            defaultValue={[min, max]}
                            // onChange={}
                            valueLabelDisplay="auto"
                            // aria-labelledby=""
                            // getAriaValueText={}
                            step={element.scaleStep}
                            min={min}
                            max={max}
                        />
                    </div>
                );
            }
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