/**
 * User: Maxime
 * DateTime: 15/04/2020 13:25
 * Project: frontend
 */

import React, { useRef, useState } from 'react';
import { Container, Theme } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import EventModel, { EventStatus } from '../../models/EventModel';
import EventsList from './EventsList';
import { fakeEvents } from './TempFakeData';

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
    const [expanded, setExpanded] = useState<EventStatus | undefined>(undefined);

    const getEvents = (status: EventStatus): EventModel[] => {
        const event = fakeEvents.filter((e) => e.getStatus() == status);
        return event.sort((e, f) => e.startDateTime - f.startDateTime);
    };

    return (
        <Container maxWidth="md">
            <div className={classes.root}>
                {Object.keys(EventStatus).map((key) => {
                    // @ts-ignore
                    const status: EventStatus = EventStatus[key];
                    const event = getEvents(status);
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
