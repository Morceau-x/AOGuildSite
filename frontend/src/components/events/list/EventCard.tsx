/**
 * User: Maxime
 * DateTime: 01/05/2020 19:37
 * Project: frontend
 */

import React from 'react';
import { Divider, Paper, Theme, Typography } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import EventModel from '../../../models/EventModel';
import CardHeader from './CardHeader';
import CardAdditionalData from './CardAdditionalData';
import CardActions from './CardActions';
import { DATE_TIME_FORMAT } from '../../../Globals';

const useStyles = makeStyles((theme: Theme) => {
    return {
        root: {
            margin: '0.5vh',
            padding: '0 2vw',
        },
        divider: {
            margin: '10px 0',
        },
    };
});

export interface EventCardProps {
    event: EventModel;
}

export default function EventCard(props: EventCardProps) {
    const classes = useStyles();

    return (
        <Paper classes={{ root: classes.root }} elevation={1} square>
            <CardHeader event={props.event} options={DATE_TIME_FORMAT} />
            <Divider className={classes.divider} />
            <Typography variant="h5">{'    ' + props.event.description}</Typography>
            <Divider className={classes.divider} />
            <CardAdditionalData event={props.event} options={DATE_TIME_FORMAT} />
            <Divider className={classes.divider} />
            <CardActions event={props.event} />
        </Paper>
    );
}
