/**
 * User: Maxime
 * DateTime: 03/05/2020 00:32
 * Project: frontend
 */

import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import { EventCardProps } from './EventCard';
import { grey } from '@material-ui/core/colors';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CardLine from './CardLine';

const useStyles = makeStyles({
    bold: {
        padding: '5px',
        margin: '5px 5px',
        backgroundColor: grey[200],
    },
});

export default function CardAdditionalData(props: EventCardProps & { options: Intl.DateTimeFormatOptions }) {
    const classes = useStyles();
    return (
        <>
            <CardLine
                leftProps={{ style: { flexWrap: 'wrap' } }}
                left={
                    <>
                        <Typography variant="h6">{'    Inscriptions entre le '}</Typography>
                        <Paper elevation={1} classes={{ root: classes.bold }} square>
                            <Typography variant="h6">
                                {new Date(props.event.openDateTime).toLocaleString('fr-FR', props.options)}
                            </Typography>
                        </Paper>
                        <Typography variant="h6">{' et le '}</Typography>
                        <Paper elevation={1} classes={{ root: classes.bold }} square>
                            <Typography variant="h6">
                                {new Date(props.event.closeDateTime).toLocaleString('fr-FR', props.options)}
                            </Typography>
                        </Paper>
                    </>
                }
            />
            <CardLine
                leftProps={{ style: { flexWrap: 'wrap' } }}
                left={
                    <>
                        <Typography variant="h6">{'    Rendez-vous à '}</Typography>
                        <Paper elevation={1} classes={{ root: classes.bold }} square>
                            <Typography variant="h6">{props.event.meetingPoint || '_'}</Typography>
                        </Paper>
                        <Typography variant="h6">{' le '}</Typography>
                        <Paper elevation={1} classes={{ root: classes.bold }} square>
                            <Typography variant="h6">
                                {new Date(props.event.readyDateTime).toLocaleString('fr-FR', props.options)}
                            </Typography>
                        </Paper>
                    </>
                }
            />
            <CardLine
                leftProps={{ style: { flexWrap: 'wrap' } }}
                left={
                    <>
                        <Typography variant="h6">{"    Fin de l'événement estimée le "}</Typography>
                        <Paper elevation={1} classes={{ root: classes.bold }} square>
                            <Typography variant="h6">
                                {new Date(props.event.endDateTime).toLocaleString('fr-FR', props.options)}
                            </Typography>
                        </Paper>
                    </>
                }
            />
        </>
    );
}
