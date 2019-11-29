import React, { useRef } from 'react';
import { Button, ButtonProps, Typography } from '@material-ui/core';
import { Link as RouterLink, useRouteMatch } from 'react-router-dom';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { closeNavBarAction, toggleNavBarAction } from '../../store/navbar/NavBarActions';
import { useDispatch, useSelector } from 'react-redux';
import useTheme from '@material-ui/core/styles/useTheme';
import { NavBarState } from '../../store/navbar/NavBarTypes';

const useStyles = makeStyles({
    root: {
        '&:hover': {
            color: '#EDB33D',
        },
        display: 'flex',
        borderRadius: 'unset',
        color: '#FFF',
        width: 'auto',
        minWidth: 'auto',
        padding: '1 10%',
    },
    label: {
        textTransform: 'capitalize',
        fontSize: '1.25rem',
    },
});

interface NavItemProps {
    text: string;
    iconBefore?: JSX.Element;
    iconAfter?: JSX.Element;
    to?: string;
    menu?: React.ReactNode;
    routes?: string[];
    buttonProps?: ButtonProps;
    authentication: { current: boolean | undefined; required: boolean | undefined };
}

NavItem.defaultProps = {
    authentication: { current: undefined, required: undefined },
};

export default function NavItem(props: NavItemProps) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const nav: NavBarState = useSelector((state: { nav: NavBarState; [key: string]: any }) => state.nav);
    const match = props.to ? useRouteMatch(props.to) : props.menu ? useRouteMatch({ path: props.routes, exact: true }) : null;
    const selected = match ? match.isExact : false;
    const ref = useRef();
    const theme = useTheme();

    const display = (): boolean => {
        return !(props.authentication.required != undefined && props.authentication.required != props.authentication.current);
    };
    return display() ? (
        <Button
            variant="text"
            style={selected ? { borderBottom: '4px solid', borderColor: theme.palette.secondary.main } : undefined}
            classes={{ root: classes.root, label: classes.label }}
            {...(props.to != undefined ? { component: RouterLink, to: props.to } : {})}
            onClick={() => {
                if (props.menu) dispatch(toggleNavBarAction(nav, ref, props.menu));
                else dispatch(closeNavBarAction());
            }}
            ref={ref}
            {...props.buttonProps}
        >
            {props.iconBefore}

            <Typography variant="h6" color="inherit" noWrap>
                {props.text}
            </Typography>

            {props.iconAfter}
        </Button>
    ) : (
        <></>
    );
}
