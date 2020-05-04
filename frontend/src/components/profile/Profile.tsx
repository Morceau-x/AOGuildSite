import React, { useEffect } from 'react';
import { Divider, Paper, Typography } from '@material-ui/core';
import { AuthState, fetchPermissions } from '../../store/auth/AuthTypes';
import { useDispatch, useSelector } from 'react-redux';
import AlbionPlayers from './AlbionPlayers';
import { State } from '../../store/Reducer';

export default function Profile() {
    const dispatch = useDispatch();
    const auth: AuthState = useSelector((state: State) => state.auth);

    return (
        <div style={{ margin: '5%' }}>
            <Paper style={{ padding: '20px 10px 10px 30px', margin: '0 0 10px 0' }}>
                <Typography variant="h4">Nom d'utilisateur</Typography>
                <Typography variant="body1" paragraph>
                    {auth.username}
                </Typography>
                <Typography variant="h4">Discriminant</Typography>
                <Typography variant="body1" paragraph>
                    {auth.discriminator}
                </Typography>
            </Paper>

            <Paper style={{ padding: '20px 10px 10px 30px', margin: '0 0 10px 0' }}>
                <Typography variant="h4">Groupes</Typography>
                <div style={{ marginBottom: '20px' }}>
                    {auth.groups.map((group) => (
                        <Typography key={group} variant="body1">
                            {'- ' + group}
                        </Typography>
                    ))}
                </div>
                <Divider />
                <Typography variant="h4" style={{ marginTop: '20px' }}>
                    Permissions
                </Typography>
                <div style={{ marginBottom: '20px' }}>
                    {auth.permissions.map((perm) => (
                        <Typography key={perm} variant="body1">
                            {'- ' + perm}
                        </Typography>
                    ))}
                </div>
            </Paper>
            <AlbionPlayers />
        </div>
    );
}
