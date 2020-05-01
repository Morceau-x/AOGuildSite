import React from 'react';
import { AppBar, Paper, Popper, Toolbar } from '@material-ui/core';
import { useSelector } from 'react-redux';
import AuthButton from './buttons/AuthButton';

import NavItem from './NavItem';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { AuthState } from '../../store/auth/AuthTypes';
import { NavBarState } from '../../store/navbar/NavBarTypes';
import { MoreVert } from '@material-ui/icons';
import AuthItemList from './menus/AuthItemList';
import LogoButton from './buttons/LogoButton';

const useStyles = makeStyles({
    toolbar: {
        display: 'flex',
        alignItems: 'stretch',
    },
    left: {
        display: 'flex',
        flexGrow: 1,
        alignItems: 'stretch',
    },
    right: {
        display: 'flex',
        alignItems: 'stretch',
    },
});

export default function NavBar() {
    const classes = useStyles();
    const { auth, nav }: { auth: AuthState; nav: NavBarState } = useSelector(
        (state: { auth: AuthState; nav: NavBarState; [key: string]: any }) => {
            return { auth: state.auth, nav: state.nav };
        }
    );
    const authenticated = auth.authenticated;

    return (
        <>
            <AppBar position="sticky" color="primary">
                <Toolbar className={classes.toolbar}>
                    <LogoButton />

                    <div className={classes.left}>
                        <NavItem
                            text="TODO"
                            itemData={{ to: '/todo' }}
                            auth={{ required: true, current: authenticated }}
                        />
                        <NavItem
                            text="Evénements"
                            itemData={{ to: '/events' }}
                            auth={{ required: true, current: authenticated }}
                        />
                    </div>

                    <div className={classes.right}>
                        <NavItem
                            text={auth.username + '#' + auth.discriminator}
                            buttonProps={{
                                endIcon: <MoreVert fontSize="large" />,
                            }}
                            itemData={{
                                menu: <AuthItemList />,
                                routes: ['/profile'],
                            }}
                            auth={{ required: true, current: authenticated }}
                        />
                        <AuthButton required={false} current={authenticated} />
                    </div>
                </Toolbar>
                <Popper anchorEl={nav.anchorEl ? nav.anchorEl.current : null} open={nav.open} disablePortal>
                    {nav.menu ? <Paper> {nav.menu} </Paper> : <div />}
                </Popper>
            </AppBar>
        </>
    );
}
