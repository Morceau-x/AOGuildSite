/**
 * User: Maxime
 * DateTime: 04/05/2020 10:50
 * Project: frontend
 */

import React from 'react';
import EventModel from '../../../models/EventModel';
import { Paper, Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { DATE_TIME_FORMAT } from '../../../Globals';
import ActionButton from '../actions/ActionButton';
import EditEventButton from '../actions/EditEventButton';

const useStyles = makeStyles({
    root: {
        padding: '2vh 20px',
    },
    line: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    label: {
        width: '200px',
    },
    bold: {
        padding: '5px',
        margin: '5px 5px',
        backgroundColor: grey[200],
        width: 'auto',
    },
});

/**
 * EventDescription
 * React Functional Component
 *
 * @param props
 */
export default function EventDescription(props: { event: EventModel }) {
    const classes = useStyles();

    return (
        <>
            <ObjectDisplayer object={props.event} />
            <div className={classes.root}>
                <EditEventButton event={props.event} />
            </div>
        </>
    );
}

export function ObjectDisplayer(props: { object: { [key: string]: any } }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {Object.keys(props.object).map((key) => {
                // @ts-ignore
                const value = props.object[key];
                if (typeof value == 'string' || typeof value == 'number' || typeof value == 'boolean') {
                    let displayedKey = '';
                    let displayedValue = '';
                    if (key.endsWith('DateTime')) {
                        displayedKey = key.replace('DateTime', '');
                        displayedValue = new Date(value as number).toLocaleString('fr-FR', DATE_TIME_FORMAT);
                    } else {
                        displayedKey = key;
                        displayedValue = value.toString();
                    }

                    return (
                        <div className={classes.line} key={key}>
                            <Typography variant="h5" classes={{ root: classes.label }}>
                                {displayedKey}
                            </Typography>
                            <Paper elevation={1} classes={{ root: classes.bold }} square>
                                <Typography variant="h6">{displayedValue}</Typography>
                            </Paper>
                        </div>
                    );
                } else if (Array.isArray(value)) {
                    let i = 0;
                    return (
                        <div className={classes.line} key={key}>
                            <Typography variant="h5" classes={{ root: classes.label }}>
                                {key}
                            </Typography>
                            {value.map((item) => {
                                return (
                                    <Paper elevation={1} classes={{ root: classes.bold }} square key={i++}>
                                        <Typography variant="h6">{item.value}</Typography>
                                    </Paper>
                                );
                            })}
                        </div>
                    );
                } else if (value && {}.toString.call(value) === '[object Function]') {
                    return null;
                } else {
                    return (
                        <div className={classes.line} key={key}>
                            <Typography variant="h5" classes={{ root: classes.label }}>
                                {key}
                            </Typography>
                            <ObjectDisplayer object={value} key={key} />
                        </div>
                    );
                }
            })}
        </div>
    );
}
