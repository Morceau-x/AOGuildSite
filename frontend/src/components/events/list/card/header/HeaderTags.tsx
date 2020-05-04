/**
 * User: Maxime
 * DateTime: 03/05/2020 01:59
 * Project: frontend
 */

import React from 'react';
import { Paper, PaperProps, Tooltip, Typography, TypographyProps } from '@material-ui/core';
import { EventBuildOptions, EventParticipantsOptions } from '../../../../../models/EventModel';
import { blue, green, lime, purple, yellow } from '@material-ui/core/colors';

export interface HeaderTagProps {
    title: string;
    typographyProps: TypographyProps;
    paperProps?: PaperProps;
    text: string;
}

export default function HeaderTag(props: HeaderTagProps) {
    const paperProps: PaperProps = {
        elevation: 0,
        ...props.paperProps,
        style: {
            borderRadius: '3px',
            padding: '5px',
            marginRight: '10px',
            ...props.paperProps?.style,
        },
    };

    return (
        <Tooltip title={props.title}>
            <Paper {...paperProps}>
                <Typography {...props.typographyProps}>{props.text}</Typography>
            </Paper>
        </Tooltip>
    );
}

export function TypeTag(props: { type: string; color: string }) {
    return (
        <HeaderTag
            title={'Evénement de type ' + props.type}
            typographyProps={{ variant: 'h5', style: { color: '#FFF' } }}
            text={props.type}
            paperProps={{ style: { backgroundColor: props.color } }}
        />
    );
}

export function StartTag(props: { start: Date; options: Intl.DateTimeFormatOptions }) {
    return (
        <HeaderTag
            title="Début de l'événement"
            typographyProps={{ variant: 'h5', style: { color: '#FFF' } }}
            text={props.start.toLocaleString('fr-FR', props.options)}
            paperProps={{ style: { backgroundColor: green[700] } }}
        />
    );
}

export function BuildTag(props: { build: EventBuildOptions }) {
    return !props.build ? null : (
        <HeaderTag
            title="Stuff nécessaire"
            typographyProps={{ variant: 'h5', style: { color: '#FFF' } }}
            text={props.build.numberOfStuffs > 1 ? 'Stuffs: ' + props.build.numberOfStuffs : 'Stuff'}
            paperProps={{ style: { backgroundColor: yellow[700] } }}
        />
    );
}

export function IPTag(props: { build: EventBuildOptions }) {
    if (!props.build) return null;

    const constProps: { typographyProps: TypographyProps; paperProps: PaperProps } = {
        typographyProps: { variant: 'h5', style: { color: '#FFF' } },
        paperProps: { style: { backgroundColor: purple[700] } },
    };

    if (props.build.minimumIP && props.build.maximumIP)
        return (
            <HeaderTag
                title={'IP comprise entre: ' + props.build.minimumIP + ' et ' + props.build.maximumIP}
                text={'IP: ' + props.build.minimumIP + ' - ' + props.build.maximumIP}
                {...constProps}
            />
        );

    if (props.build.minimumIP)
        return <HeaderTag title="IP minimum requise" text={'IP min: ' + props.build.minimumIP} {...constProps} />;

    if (props.build.maximumIP)
        return <HeaderTag title="IP maximum" text={'IP max: ' + props.build.maximumIP} {...constProps} />;

    return null;
}

export function SlotsTag(props: { participants: EventParticipantsOptions }) {
    return props.participants.slots != 'unlimited' ? (
        <HeaderTag
            title={'Nombre de places totales: ' + props.participants.slots}
            typographyProps={{ variant: 'h5', style: { color: '#FFF' } }}
            text={'Places: ' + (props.participants.remainingSlots || 0)}
            paperProps={{ style: { backgroundColor: blue[700] } }}
        />
    ) : null;
}
