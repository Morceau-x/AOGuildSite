/**
 * User: Maxime
 * DateTime: 15/04/2020 13:25
 * Project: frontend
 */

import React, { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import EventModel, { EventStatus } from '../../../models/EventModel';
import EventsList from './EventsList';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../../store/Reducer';
import { fetchEvents } from '../../../store/events/EventsTypes';
import EventsListActions from './EventsListActions';

const useStyles = makeStyles({
    root: {
        margin: '2%',
    },
});

export default function EventsListRoot() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const events = useSelector((state: State): EventModel[] => state.events.events);
    const [expanded, setExpanded] = useState<EventStatus | undefined>(undefined);

    useEffect(() => {
        dispatch(fetchEvents());
    }, []);

    const getEvents = (status: EventStatus): EventModel[] => {
        if (!events) return undefined;
        const event = events.filter((e) => e.getStatus() == status);
        return event.sort((e, f) => e.startDateTime - f.startDateTime);
    };

    return (
        <Container maxWidth="md">
            <div className={classes.root}>
                <EventsListActions />
                {Object.keys(EventStatus).map((key) => {
                    // @ts-ignore
                    const status: EventStatus = EventStatus[key];
                    const event = getEvents(status);
                    if (!event) return null;
                    return event.length < 1 ? null : (
                        <EventsList
                            status={status}
                            events={event}
                            key={status}
                            expanded={expanded}
                            setExpanded={setExpanded}
                        />
                    );
                })}
                {}
            </div>
        </Container>
    );
}
