/**
 * User: Maxime
 * DateTime: 03/05/2020 00:32
 * Project: frontend
 */

import React from 'react';
import { Paper, Tooltip, Typography } from '@material-ui/core';
import { EventCardProps } from './EventCard';
import { lime, orange, purple, red } from '@material-ui/core/colors';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CardLine from './CardLine';

const useStyles = makeStyles({
    date: {
        padding: '5px',
        margin: '0.3vh 0.3vw',
    },
});

/**
 * SummaryTimings
 * React Functional Component
 *
 * @param props
 */
export default function CardAdditionalData(props: EventCardProps & { options: Intl.DateTimeFormatOptions }) {
    const classes = useStyles();
    return (
        <CardLine
            wrap
            leftProps={{
                style: {
                    flexGrow: 1,
                    justifyContent: 'center',
                },
            }}
            midProps={{
                style: {
                    flexGrow: 0,
                },
            }}
            rightProps={{
                style: {
                    flexGrow: 1,
                    justifyContent: 'center',
                },
            }}
            left={
                <div>
                    <Tooltip title="Début des inscriptions">
                        <Paper elevation={1} classes={{ root: classes.date }} style={{ borderColor: lime[200] }}>
                            <Typography variant="h6">
                                {'Début des inscriptions ' +
                                    new Date(props.event.openDateTime).toLocaleString('fr-FR', props.options)}
                            </Typography>
                        </Paper>
                    </Tooltip>
                    <Tooltip title="Fin des inscriptions">
                        <Paper elevation={1} classes={{ root: classes.date }} style={{ boxShadow: red[200] }}>
                            <Typography variant="h6">
                                {'Fin des inscriptions     ' +
                                    new Date(props.event.closeDateTime).toLocaleString('fr-FR', props.options)}
                            </Typography>
                        </Paper>
                    </Tooltip>
                </div>
            }
            right={
                <div>
                    <Tooltip title="Heure de RDV">
                        <Paper elevation={1} classes={{ root: classes.date }} style={{ borderColor: purple[200] }}>
                            <Typography variant="h6">
                                {'Heure de RDV             ' +
                                    new Date(props.event.readyDateTime).toLocaleString('fr-FR', props.options)}
                            </Typography>
                        </Paper>
                    </Tooltip>
                    <Tooltip title="Fin approximative">
                        <Paper elevation={1} classes={{ root: classes.date }} style={{ borderColor: orange[200] }}>
                            <Typography variant="h6">
                                {'Fin approximative        ' +
                                    new Date(props.event.endDateTime).toLocaleString('fr-FR', props.options)}
                            </Typography>
                        </Paper>
                    </Tooltip>
                </div>
            }
        />
    );
}
