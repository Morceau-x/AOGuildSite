/**
 * User: Maxime
 * DateTime: 03/05/2020 20:02
 * Project: frontend
 */

import React from 'react';
import { ButtonProps, SvgIcon } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ActionButton from './ActionButton';

export interface LinkActionButtonProps {
    to: string;
    icon: typeof SvgIcon;
    buttonProps?: ButtonProps;
    text: string;
    color: string;
}

export default function LinkActionButton(props: LinkActionButtonProps) {
    const buttonProps: ButtonProps = {
        // @ts-ignore
        component: Link,
        to: props.to,
        startIcon: <props.icon />,
        ...props.buttonProps,
    };

    return <ActionButton buttonProps={buttonProps} text={props.text} color={props.color} />;
}
