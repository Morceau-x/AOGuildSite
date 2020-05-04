/**
 * User: Maxime
 * DateTime: 02/05/2020 20:34
 * Project: frontend
 */

import React from 'react';
import { Tooltip, Typography } from '@material-ui/core';
import { EventCardProps } from './EventCard';
import { useSelector } from 'react-redux';
import { State } from '../../../store/Reducer';
import { red } from '@material-ui/core/colors';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CardLine from './CardLine';
import { BuildTag, IPTag, SlotsTag, StartTag, TypeTag } from './card/header/HeaderTags';
import { BlacklistIcon, GuildGivesIcon, OfficialIcon, PublicIcon, WhitelistIcon } from './card/header/HeaderIcons';
import PermissionsManager, { Permission } from '../../common/PermissionsManager';

const useStyles = makeStyles({
    name: {
        padding: '5px',
        marginRight: '15px',
    },
});

export default function CardHeader(props: EventCardProps & { options: Intl.DateTimeFormatOptions }) {
    const classes = useStyles();
    const permissions = new PermissionsManager(useSelector((state: State) => state.auth.permissions));
    const canSeePrivate = permissions.hasPermission(Permission.SEE_PRIVATE_EVENTS);

    return (
        <CardLine
            containerProps={{ style: { marginTop: '15px' } }}
            leftProps={{ style: { flexWrap: 'wrap' } }}
            left={
                <>
                    <Tooltip title={"Nom de l'événement " + props.event.type}>
                        <Typography variant="h4" classes={{ root: classes.name }}>
                            {props.event.name}
                        </Typography>
                    </Tooltip>
                    <TypeTag type={props.event.type} color={getTypeColor(props.event.type)} />
                    <StartTag start={new Date(props.event.startDateTime)} options={props.options} />
                    <BuildTag build={props.event.build} />
                    <IPTag build={props.event.build} />
                    <SlotsTag participants={props.event.participants} />
                </>
            }
            mid={<></>}
            right={
                <>
                    <WhitelistIcon participants={props.event.participants} />
                    <BlacklistIcon participants={props.event.participants} />

                    <GuildGivesIcon build={props.event.build} />
                    <PublicIcon
                        public={props.event.public}
                        canSeePrivate={canSeePrivate}
                        publicDate={new Date(props.event.publicDateTime)}
                        options={props.options}
                    />
                    <OfficialIcon official={props.event.official} />
                </>
            }
        />
    );
}

const getTypeColor = (type: string): string => {
    switch (type) {
        case 'ZvZ':
            return red[700];
    }
};
