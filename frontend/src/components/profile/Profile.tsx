import React, { useEffect } from 'react';
import { Divider, Paper, Typography } from '@material-ui/core';
import { AuthState } from '../../store/auth/AuthTypes';
import { useDispatch, useSelector } from 'react-redux';
import { getUserPermissionsAction } from '../../store/auth/AuthActions';
import AlbionPlayers from './AlbionPlayers';

export default function Profile() {
    const dispatch = useDispatch();
    const auth: AuthState = useSelector((state: { auth: AuthState; [key: string]: any }) => state.auth);

    useEffect(() => {
        dispatch(getUserPermissionsAction());
    }, []);

    return (
        <div style={{ margin: '5%' }}>
            <Paper style={{ padding: '20px 10px 10px 30px', margin: '0 0 10px 0' }}>
                <Typography variant="h6">Nom d'utilisateur</Typography>
                <Typography variant="body1" paragraph>
                    {auth.username}
                </Typography>
                <Typography variant="h6">Discriminant</Typography>
                <Typography variant="body1" paragraph>
                    {auth.discriminator}
                </Typography>
            </Paper>

            <Paper style={{ padding: '20px 10px 10px 30px', margin: '0 0 10px 0' }}>
                <Typography variant="h6">Groupes</Typography>
                <div style={{ marginBottom: '20px' }}>
                    {auth.groups.map((group) => (
                        <Typography key={group} variant="body1">
                            {'- ' + group}
                        </Typography>
                    ))}
                </div>
                <Divider />
                <Typography variant="h6" style={{ marginTop: '20px' }}>
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
