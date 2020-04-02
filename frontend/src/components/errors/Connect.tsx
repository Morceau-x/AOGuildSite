import React from 'react';
import { Typography } from '@material-ui/core';
import AuthButton from '../nav/buttons/AuthButton';

export default function Connect() {
    return (
        <div>
            <Typography variant="h2">Erreur d'authentification</Typography>
            <Typography variant="h4">Vous n'êtes pas connecté.</Typography>
        </div>
    );
}
