import { Button, Divider, MenuList } from '@material-ui/core';
import { Dashboard, ExitToApp, Help, Person, Settings } from '@material-ui/icons';
import React, { useRef } from 'react';
import NavMenuItem from '../NavMenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUserAction } from '../../../store/auth/AuthActions';
import { NavBarState } from '../../../store/navbar/NavBarTypes';
import useTheme from '@material-ui/core/styles/useTheme';

export default function AuthItemList() {
    const dispatch = useDispatch();

    return (
        <MenuList disableListWrap>
            <NavMenuItem text="Profil" iconBefore={<Person />} to="/profile" />
            <NavMenuItem text="Destiny Board" iconBefore={<Dashboard />} to="#" />
            <NavMenuItem text="Paramètres" iconBefore={<Settings />} to="#" />
            <Divider variant="middle" />
            <NavMenuItem
                text="Déconnexion"
                iconBefore={<ExitToApp />}
                clickEvent={(event: React.MouseEvent) => {
                    dispatch(logOutUserAction());
                }}
                to="#"
            />
        </MenuList>
    );
}
