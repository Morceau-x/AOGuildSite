import { Divider, MenuList } from '@material-ui/core';
import { Dashboard, ExitToApp, Person, Settings } from '@material-ui/icons';
import React from 'react';
import NavMenuItem from '../NavMenuItem';
import { useDispatch } from 'react-redux';
import { logOutRemote } from '../../../store/auth/AuthTypes';

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
                clickEvent={() => dispatch(logOutRemote())}
                to="#"
            />
        </MenuList>
    );
}
