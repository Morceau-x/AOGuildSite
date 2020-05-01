import React, { useEffect, useRef } from 'react';
import { Button, ButtonProps, Theme, Typography } from '@material-ui/core';
import { Link as RouterLink, useRouteMatch } from 'react-router-dom';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { closeNavBarAction, toggleNavBarAction } from '../../store/navbar/NavBarActions';
import { useDispatch, useSelector } from 'react-redux';
import { NavBarState } from '../../store/navbar/NavBarTypes';

//////////////////////////////////////////////////////////////
/// Props
//////////////////////////////////////////////////////////////

export abstract class SimpleNavItem {
    to: string;
}

export abstract class MenuNavItem {
    menu: React.ReactNode;
    routes: string[];
}

export interface NavItemAuthStatus {
    current: boolean | undefined;
    required: boolean | undefined;
}

interface NavItemProps {
    text: string;
    buttonProps?: ButtonProps;
    itemData?: SimpleNavItem | MenuNavItem;
    auth: NavItemAuthStatus;
}

NavItem.defaultProps = {
    authentication: { current: undefined, required: undefined },
};

//////////////////////////////////////////////////////////////
/// Style
//////////////////////////////////////////////////////////////

interface NavItemStyleProps {
    itemSelected: boolean;
}

const useStyles = makeStyles((theme: Theme) => {
    return {
        root: (props: NavItemStyleProps) => {
            return {
                '&:hover': {
                    color: '#EDB33D',
                },
                display: 'flex',
                borderRadius: 'unset',
                color: '#FFF',
                width: 'auto',
                minWidth: 'auto',
                padding: '1 10%',
                ...(props.itemSelected
                    ? {
                          borderBottom: '4px solid',
                          borderColor: theme.palette.secondary.main,
                      }
                    : {}),
            };
        },
    };
});

//////////////////////////////////////////////////////////////
/// Component
//////////////////////////////////////////////////////////////

export default function NavItem(props: NavItemProps) {
    const dispatch = useDispatch();
    const ref = useRef();
    const nav: NavBarState = useSelector((state: { nav: NavBarState; [key: string]: any }) => state.nav);

    const match = !props.itemData
        ? { isExact: false }
        : props.itemData instanceof SimpleNavItem
        ? useRouteMatch(props.itemData.to)
        : useRouteMatch({ path: props.itemData.routes, exact: true });
    const classes = useStyles({ itemSelected: match ? match.isExact : false });

    let routing = {};
    useEffect(() => {
        routing = props.itemData instanceof SimpleNavItem ? { component: RouterLink, to: props.itemData.to } : {};
    }, [props.itemData]);

    const handleClick = () => {
        if (props.itemData instanceof SimpleNavItem) {
            dispatch(closeNavBarAction());
        } else if (props.itemData instanceof MenuNavItem) {
            dispatch(toggleNavBarAction(nav, ref, props.itemData.menu));
        }
    };

    return display(props.auth.required, props.auth.current) ? (
        <Button
            variant="text"
            classes={{ root: classes.root }}
            onClick={handleClick}
            ref={ref}
            {...routing}
            {...props.buttonProps}
        >
            <Typography variant="h6" color="inherit" noWrap>
                {props.text}
            </Typography>
        </Button>
    ) : (
        <></>
    );
}

//////////////////////////////////////////////////////////////
/// Helpers
//////////////////////////////////////////////////////////////

const display = (required: boolean | undefined, current: boolean | undefined): boolean => {
    return !(required != undefined && required != current);
};
