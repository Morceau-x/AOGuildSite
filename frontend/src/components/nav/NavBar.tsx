import React from 'react';
import { AppBar, Paper, Popper, Toolbar } from '@material-ui/core';
import { useSelector } from 'react-redux';
import AuthButton from './buttons/AuthButton';

import NavItem, { MenuNavItem, SimpleNavItem } from './NavItem';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { AuthState } from '../../store/auth/AuthTypes';
import { NavBarState } from '../../store/navbar/NavBarTypes';
import { MoreVert } from '@material-ui/icons';
import AuthItemList from './menus/AuthItemList';
import LogoButton from './buttons/LogoButton';
import { State } from '../../store/Reducer';

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
    const { auth, nav }: { auth: AuthState; nav: NavBarState } = useSelector((state: State) => {
        return { auth: state.auth, nav: state.nav };
    });
    const authOptions = { required: true, current: auth.authenticated };

    return (
        <>
            <AppBar position="sticky" color="primary">
                <Toolbar className={classes.toolbar}>
                    <LogoButton />

                    <div className={classes.left}>
                        <NavItem text="Evénements" itemData={new SimpleNavItem('/event/list')} auth={authOptions} />
                    </div>

                    <div className={classes.right}>
                        <NavItem
                            text={auth.username + '#' + auth.discriminator}
                            buttonProps={{
                                endIcon: <MoreVert fontSize="large" />,
                            }}
                            itemData={new MenuNavItem(<AuthItemList />, ['/profile'])}
                            auth={authOptions}
                        />
                        <AuthButton required={false} current={auth.authenticated} />
                    </div>
                </Toolbar>
                <Popper anchorEl={nav.anchorEl ? nav.anchorEl.current : null} open={nav.open} disablePortal>
                    {nav.menu ? <Paper> {nav.menu} </Paper> : <div />}
                </Popper>
            </AppBar>
        </>
    );
}
