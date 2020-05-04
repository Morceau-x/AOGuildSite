/**
 * User: Maxime
 * DateTime: 03/05/2020 16:09
 * Project: frontend
 */

import React from 'react';
import { Button, ButtonProps, Typography } from '@material-ui/core';
import { orange, red } from '@material-ui/core/colors';

/**
 * ActionButton
 * React Functional Component
 *
 * @param props
 */
export default function ActionButton(props: { buttonProps: ButtonProps; text: string; color: string }) {
    return (
        <Button
            variant="outlined"
            {...props.buttonProps}
            style={{ margin: '0 5px', borderColor: props.color, color: props.color, ...props.buttonProps.style }}
        >
            <Typography variant="h4">{props.text}</Typography>
        </Button>
    );
}
