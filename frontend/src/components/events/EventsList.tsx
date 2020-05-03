/**
 * User: Maxime
 * DateTime: 01/05/2020 15:29
 * Project: frontend
 */

import React from 'react';
import {
    Avatar,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Theme,
    Typography,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import makeStyles from '@material-ui/core/styles/makeStyles';
import EventModel, { EventStatus } from '../../models/EventModel';
import { blue, green, orange, red, yellow } from '@material-ui/core/colors';
import EventCard from './card/EventCard';

const useStyles = makeStyles((theme: Theme) => {
    return {
        root: {
            '&.Mui-expanded': {
                margin: 0,
            },
            '&.Mui-expanded:before': {
                opacity: 'unset',
            },
        },
        details: {
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'space-around',
            backgroundColor: '#EEE',
            padding: '0.5vh 1vw',
        },
        avatar: {
            alignSelf: 'center',
            marginRight: '3vw',
            width: theme.spacing(3),
            height: theme.spacing(3),
        },
    };
});

const getData = (status: EventStatus): { title: string; color: string } => {
    switch (status) {
        case EventStatus.UPCOMING:
            return { title: 'Evénements futurs', color: blue[500] };
        case EventStatus.OPEN:
            return { title: 'Evénements ouverts aux inscriptions', color: green[500] };
        case EventStatus.CLOSED:
            return { title: 'Evénements fermés aux inscriptions', color: yellow[600] };
        case EventStatus.ONGOING:
            return { title: 'Evénements en cours', color: orange[600] };
        case EventStatus.FINISHED:
            return { title: 'Evénements terminés', color: red[800] };
        case EventStatus.CANCELED:
            return { title: 'Evénement annulés', color: '#000' };
    }
};

export interface EventsListProps {
    status: EventStatus;
    events: EventModel[];
    expanded: EventStatus;
    setExpanded: (status: EventStatus | undefined) => void;
}

export default function EventsList(props: EventsListProps) {
    const classes = useStyles();

    const handleChange = () => {
        if (props.expanded == props.status) props.setExpanded(undefined);
        else props.setExpanded(props.status);
    };

    const data = getData(props.status);
    return (
        <ExpansionPanel
            classes={{ root: classes.root }}
            expanded={props.expanded == props.status}
            onChange={() => handleChange()}
        >
            <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                <Avatar classes={{ root: classes.avatar }} style={{ backgroundColor: data.color }}>
                    {' '}
                </Avatar>
                <Typography variant="h4">{data.title}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails classes={{ root: classes.details }}>
                {props.events.map((event) => {
                    return <EventCard event={event} key={event.id} />;
                })}
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
}
