import React from 'react';
import {
    CLOSE_NAV_BAR_MENU,
    NavBarCloseActionType,
    NavBarOpenActionType,
    NavBarState,
    OPEN_NAV_BAR_MENU,
} from './NavBarTypes';

export function toggleNavBarAction(
    nav: NavBarState,
    anchorEl: React.RefObject<any>,
    menu: React.ReactNode
): NavBarOpenActionType | NavBarCloseActionType {
    return nav.anchorEl == anchorEl ? closeNavBarAction() : openNavBarAction(anchorEl, menu);
}

export function openNavBarAction(anchorEl: React.RefObject<any>, menu: React.ReactNode): NavBarOpenActionType {
    return {
        type: OPEN_NAV_BAR_MENU,
        anchorEl: anchorEl,
        menu: menu,
    };
}

export function closeNavBarAction(): NavBarCloseActionType {
    return {
        type: CLOSE_NAV_BAR_MENU,
    };
}
