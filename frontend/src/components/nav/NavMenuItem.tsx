import React, { useRef } from 'react';
import { Button, MenuItem, Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { closeNavBarAction } from '../../store/navbar/NavBarActions';
import { useDispatch, useSelector } from 'react-redux';
import { NavBarState } from '../../store/navbar/NavBarTypes';
import useTheme from '@material-ui/core/styles/useTheme';

const useStyles = makeStyles({
    root: {
        margin: 0,
        justifyContent: 'flex-start',
        display: 'flex-inline',
    },
    label: {
        marginLeft: 10,
        marginRight: 10,
        textTransform: 'capitalize',
        fontSize: '1rem',
    },
});

export interface NavMenuItemProps {
    text: string;
    to?: string;
    iconBefore?: React.ReactNode;
    iconAfter?: React.ReactNode;
    clickEvent?: (_: React.MouseEvent) => any;
}

const NavBarItemButton = React.forwardRef((props: NavMenuItemProps, _) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    function buttonProps(): {} {
        return props.to != undefined ? { component: RouterLink, to: props.to } : {};
    }

    return (
        <Button
            variant="text"
            fullWidth
            classes={{ root: classes.root, label: classes.label }}
            {...buttonProps()}
            startIcon={props.iconBefore}
            endIcon={props.iconAfter}
            onClick={(event: React.MouseEvent) => {
                dispatch(closeNavBarAction());
                if (props.clickEvent) props.clickEvent(event);
            }}
        >
            <Typography variant="h4" color="inherit" noWrap>
                {props.text}
            </Typography>
        </Button>
    );
});

export default function NavBarItem(props: NavMenuItemProps) {
    const classes = useStyles();

    return (
        <div>
            <MenuItem component={NavBarItemButton} {...props} />
        </div>
    );
}
