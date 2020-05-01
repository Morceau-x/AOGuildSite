/**
 * User: Maxime
 * DateTime: 01/05/2020 15:29
 * Project: frontend
 */

import React, { useState } from 'react';
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Theme, Typography } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme: Theme) => {
    return {
        heading: {
            fontSize: '1.25rem',
            flexBasis: '33.33%',
            flexShrink: 0,
        },
    };
});

/**
 * EventCategory
 * React Functional Component
 *
 * @param props
 */
export default function EventCategory() {
    const classes = useStyles();

    const [inProgressOpened, toggleInProgress] = useState(false);

    return (
        <ExpansionPanel expanded={inProgressOpened} onChange={() => toggleInProgress(!inProgressOpened)}>
            <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                <Typography className={classes.heading}>Events in progress</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Typography>TODO</Typography>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
}
