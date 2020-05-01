/**
 * User: Maxime
 * DateTime: 15/04/2020 13:25
 * Project: frontend
 */

import React, { useState } from 'react';
import {
    createStyles,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Theme,
    Typography,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme: Theme) => {
    return {
        root: {
            margin: '2%',
        },
    };
});

/**
 * EventList
 * React Functional Component
 *
 * @param props
 */
export default function EventList() {
    const classes = useStyles();

    return <div className={classes.root}></div>;
}
