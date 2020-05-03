/**
 * User: Maxime
 * DateTime: 03/05/2020 12:30
 * Project: frontend
 */

import React from 'react';
import { createStyles, SvgIcon, SvgIconProps, Theme, Tooltip } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    Assignment,
    AssignmentOutlined,
    AttachMoney,
    MoneyOff,
    Star,
    StarBorder,
    Visibility,
    VisibilityOff,
} from '@material-ui/icons';
import { green, lime, yellow } from '@material-ui/core/colors';
import { EventBuildOptions, EventParticipantsOptions } from '../../../../models/EventModel';

const useStyles = makeStyles((theme: Theme) => {
    return {
        icon: (props) => {
            return {
                margin: '0 5px',
                size: theme.typography.h4.fontSize,
                // @ts-ignore
                ...props.iconProps,
            };
        },
    };
});

export default function HeaderIcon(props: { title: string; icon: typeof SvgIcon; iconProps?: SvgIconProps }) {
    const classes = useStyles({ iconProps: props.iconProps });
    return <Tooltip title={props.title}>{<props.icon classes={{ root: classes.icon }} />}</Tooltip>;
}

export function OfficialIcon(props: { official: boolean }) {
    if (props.official) {
        return <HeaderIcon title="Evénement officiel!" icon={Star} iconProps={{ fill: yellow[700] }} />;
    } else {
        return <HeaderIcon title="Evénement non officiel." icon={StarBorder} />;
    }
}

export interface PublicIconProps {
    public: boolean;
    canSeePrivate: boolean;
    publicDate: Date;
    options: Intl.DateTimeFormatOptions;
}
export function PublicIcon(props: PublicIconProps) {
    if (!props.canSeePrivate) return null;

    const opening = props.publicDate
        ? ', publication le ' + props.publicDate.toLocaleString('fr-FR', props.options)
        : '';

    if (props.public) {
        return <HeaderIcon title="Evénement public" icon={Visibility} />;
    } else {
        return <HeaderIcon title={'Evénement privé' + opening} icon={VisibilityOff} />;
    }
}

export function GuildGivesIcon(props: { build: EventBuildOptions }) {
    if (!props.build) return null;
    if (props.build.guildGivesBuild)
        return (
            <HeaderIcon title="La guilde peut fournir le stuff" icon={AttachMoney} iconProps={{ fill: green[700] }} />
        );
    return null;
}

export function WhitelistIcon(props: { participants: EventParticipantsOptions }) {
    if (!props.participants.whitelist) return null;
    return (
        <HeaderIcon
            title={
                'Cet événement a une whitelist: ' + props.participants.whitelist.map((item) => item.value).join(', ')
            }
            icon={AssignmentOutlined}
        />
    );
}

export function BlacklistIcon(props: { participants: EventParticipantsOptions }) {
    if (!props.participants.blacklist) return null;
    return (
        <HeaderIcon
            title={
                'Cet événement a une blacklist: ' + props.participants.blacklist.map((item) => item.value).join(', ')
            }
            icon={Assignment}
        />
    );
}
