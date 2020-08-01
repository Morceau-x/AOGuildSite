/**
 * User: Maxime
 * DateTime: 03/05/2020 15:19
 * Project: frontend
 */

import React from 'react';
import CardLine from './CardLine';
import { ButtonProps } from '@material-ui/core';
import { AssignmentTurnedIn, Create, Search } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import EventModel, { EventStatus } from '../../../models/EventModel';
import { green, grey, orange } from '@material-ui/core/colors';
import PermissionsManager, { Permission } from '../../common/PermissionsManager';
import { useSelector } from 'react-redux';
import { State } from '../../../store/Reducer';
import ActionButton from '../actions/ActionButton';
import CancelEventButton from '../actions/CancelEventButton';
import LinkActionButton from '../actions/LinkActionButton';
import EditEventButton from '../actions/EditEventButton';

export default function CardActions(props: { event: EventModel }) {
    const status = props.event.getStatus();
    const auth = useSelector((state: State) => state.auth);
    const permissions = new PermissionsManager(auth.permissions);
    const canManageEvent =
        permissions.hasPermission(Permission.MANAGE_EVENT_PARTICIPANTS) || props.event.owner == auth.id;

    const subscribe = (): JSX.Element => {
        if (status != EventStatus.OPEN) return null;
        return (
            <LinkActionButton
                to={'/event/' + props.event.id + '/subscribe'}
                text={"S'inscrire"}
                color={green[500]}
                icon={AssignmentTurnedIn}
            />
        );
    };

    const details = (): JSX.Element => {
        if (!canManageEvent) return null;
        return (
            <LinkActionButton
                to={'/event/' + props.event.id + '/details'}
                text={'Détails'}
                color={grey[700]}
                icon={Search}
            />
        );
    };

    return (
        <CardLine
            wrap
            containerProps={{ style: { paddingBottom: '1vh' } }}
            leftProps={{ style: { flexWrap: 'wrap' } }}
            left={
                <>
                    {details()}
                    <EditEventButton event={props.event} />
                    <CancelEventButton event={props.event} />
                </>
            }
            mid={<></>}
            right={<>{subscribe()}</>}
        />
    );
}
