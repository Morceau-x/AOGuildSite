import React from 'react';
import { Typography } from '@material-ui/core';

export default function Error404() {
    return (
        <div>
            <Typography variant="h2">Erreur 404</Typography>
            <Typography variant="h4">La page n'a pas été trouvée.</Typography>
        </div>
    );
}
