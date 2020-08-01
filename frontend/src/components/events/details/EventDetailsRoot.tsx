/**
 * User: Maxime
 * DateTime: 03/05/2020 22:16
 * Project: frontend
 */

import React, { ReactNode } from 'react';
import { Container, Paper, Tab, Tabs, Typography } from '@material-ui/core';
import { useHistory, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { State } from '../../../store/Reducer';
import EventModel from '../../../models/EventModel';
import EventDescription from './EventDescription';

export default function EventDetailsRoot() {
    const params: { id?: string } = useParams();
    const history = useHistory();
    const [tab, setTab] = React.useState(0);
    const event: EventModel = useSelector((state: State) =>
        state.events.events?.find((item) => item.id == params.id && params.id != undefined)
    );

    if (!event) {
        history.goBack();
        return null;
    }

    return (
        <Container maxWidth="lg" style={{ paddingTop: '2vh', paddingBottom: '2vh' }}>
            <Paper style={{ paddingBottom: '2vh' }}>
                <Tabs value={tab} onChange={(e, tab) => setTab(tab)} variant="fullWidth">
                    <Tab label={<Typography variant="h4">Description</Typography>} />
                    <Tab label={<Typography variant="h4">Participants</Typography>} />
                </Tabs>
                <TabPanel value={tab} index={0}>
                    <EventDescription event={event} />
                </TabPanel>
            </Paper>
        </Container>
    );
}

export function TabPanel(props: { index: number; value: number; children?: ReactNode }) {
    if (props.index != props.value) return null;
    return <>{props.children}</>;
}
