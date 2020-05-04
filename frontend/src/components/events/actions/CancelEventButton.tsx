/**
 * User: Maxime
 * DateTime: 03/05/2020 16:10
 * Project: frontend
 */

import React from 'react';
import EventModel, { EventStatus } from '../../../models/EventModel';
import { Button, Dialog, DialogActions, Typography } from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import { red } from '@material-ui/core/colors';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../../store/Reducer';
import PermissionsManager, { Permission } from '../../common/PermissionsManager';
import ActionButton from './ActionButton';
import { cancelEvent } from '../../../store/events/EventsTypes';

export default function CancelEventButton(props: { event: EventModel }) {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const auth = useSelector((state: State) => state.auth);
    const permissions = new PermissionsManager(auth.permissions);

    if (!permissions.hasPermission(Permission.CANCEL_EVENTS) && props.event.owner != auth.id) {
        return null;
    }

    if (![EventStatus.UPCOMING, EventStatus.OPEN, EventStatus.CLOSED].includes(props.event.getStatus())) {
        return null;
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCancelEvent = () => {
        handleClose();
        dispatch(cancelEvent(props.event.id));
    };

    return (
        <>
            <ActionButton
                buttonProps={{
                    startIcon: <Clear />,
                    onClick: handleOpen,
                }}
                color={red[500]}
                text={'Annuler'}
            />
            <Dialog open={open} onClose={handleClose}>
                <Typography variant="h4" style={{ margin: '16px 24px', whiteSpace: 'pre-wrap' }}>
                    Es-tu sûr de vouloir annuler cet événement?
                </Typography>
                <Typography variant="h6" style={{ margin: '16px 24px', whiteSpace: 'pre-wrap' }}>
                    Cette action annulera définitivement cet événement.
                </Typography>
                <DialogActions>
                    <Button onClick={handleCancelEvent}>
                        <Typography variant="h4">Oui</Typography>
                    </Button>
                    <Button onClick={handleClose} autoFocus>
                        <Typography variant="h4">Non</Typography>
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
