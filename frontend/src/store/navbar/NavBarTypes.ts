import React from 'react';

export const OPEN_NAV_BAR_MENU = 'OPEN_NAV_BAR_MENU';
export const CLOSE_NAV_BAR_MENU = 'CLOSE_NAV_BAR_MENU';

export interface NavBarState {
    anchorEl: React.RefObject<any> | null;
    menu: React.ReactNode | null;
    open: boolean;
}

export interface NavBarOpenActionType {
    type: typeof OPEN_NAV_BAR_MENU;
    anchorEl: React.RefObject<any>;
    menu: React.ReactNode;
}

export interface NavBarCloseActionType {
    type: typeof CLOSE_NAV_BAR_MENU;
}

export type NavBarActionTypes = NavBarOpenActionType | NavBarCloseActionType;
