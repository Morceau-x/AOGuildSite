/**
 * User: Maxime
 * DateTime: 03/05/2020 17:12
 * Project: frontend
 */

import React from 'react';
import EventModel, { EventStatus } from '../../../models/EventModel';
import { orange } from '@material-ui/core/colors';
import { Create } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { State } from '../../../store/Reducer';
import PermissionsManager, { Permission } from '../../common/PermissionsManager';
import LinkActionButton from './LinkActionButton';

export default function EditEventButton(props: { event: EventModel }) {
    const status = props.event.getStatus();
    const auth = useSelector((state: State) => state.auth);
    const permissions = new PermissionsManager(auth.permissions);
    const canEditEvent = permissions.hasPermission(Permission.EDIT_EVENTS) || props.event.owner == auth.id;

    if (!canEditEvent) return null;
    if (![EventStatus.UPCOMING, EventStatus.OPEN, EventStatus.CLOSED].includes(status)) return null;
    return (
        <LinkActionButton
            to={'/event/' + props.event.id + '/edit'}
            text={'Modifier'}
            color={orange[500]}
            icon={Create}
        />
    );
}
