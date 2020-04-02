import * as React from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { closeNavBarAction } from '../../../store/navbar/NavBarActions';
import { useDispatch } from 'react-redux';
// @ts-ignore
import logo from '../../../../public/images/logo.png';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
    menuButton: {
        display: 'flex',
        alignItems: 'stretch',
        marginRight: '1%',
    },
});

export default function LogoButton() {
    const dispatch = useDispatch();
    const classes = useStyles();

    return (
        <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            component={RouterLink}
            to="/"
            onClick={() => dispatch(closeNavBarAction())}
        >
            <Avatar src={logo} alt="TSF" />
        </IconButton>
    );
}
