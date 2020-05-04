/**
 * User: Maxime
 * DateTime: 02/05/2020 21:09
 * Project: frontend
 */

import React, { HTMLProps } from 'react';

export interface CardLineProps {
    containerProps?: HTMLProps<HTMLDivElement>;
    leftProps?: HTMLProps<HTMLDivElement>;
    midProps?: HTMLProps<HTMLDivElement>;
    rightProps?: HTMLProps<HTMLDivElement>;
    left?: JSX.Element;
    mid?: JSX.Element;
    right?: JSX.Element;
    wrap?: boolean;
}

export default function CardLine(props: CardLineProps) {
    const containerProps: HTMLProps<HTMLDivElement> = {
        ...props.containerProps,
        style: {
            display: 'flex',
            alignItems: 'center',
            ...(props.wrap ? { flexWrap: 'wrap' } : {}),
            ...props.containerProps?.style,
        },
    };

    const leftProps: HTMLProps<HTMLDivElement> = {
        ...props.leftProps,
        style: {
            display: 'flex',
            alignItems: 'center',
            ...props.leftProps?.style,
        },
    };

    const midProps: HTMLProps<HTMLDivElement> = {
        ...props.midProps,
        style: {
            display: 'flex',
            justifyContent: 'space-evenly',
            flexGrow: 1,
            alignItems: 'center',
            ...props.midProps?.style,
        },
    };

    const rightProps: HTMLProps<HTMLDivElement> = {
        ...props.rightProps,
        style: {
            display: 'flex',
            alignItems: 'center',
            ...props.rightProps?.style,
        },
    };
    return (
        <div {...containerProps}>
            <div {...leftProps}>{props.left}</div>
            <div {...midProps}>{props.mid}</div>
            <div {...rightProps}>{props.right}</div>
        </div>
    );
}
