/**
 * User: Maxime
 * DateTime: 03/05/2020 19:50
 * Project: frontend
 */

import React from 'react';
import { Paper } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { green } from '@material-ui/core/colors';
import LinkActionButton from '../actions/LinkActionButton';

export default function EventsListActions() {
    return (
        <Paper>
            <LinkActionButton to={'/event/create'} text={'Créer'} color={green[500]} icon={Add} />
        </Paper>
    );
}
