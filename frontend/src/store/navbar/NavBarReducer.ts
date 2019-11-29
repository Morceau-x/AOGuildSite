import {
    CLOSE_NAV_BAR_MENU,
    NavBarActionTypes,
    NavBarCloseActionType,
    NavBarOpenActionType,
    NavBarState,
    OPEN_NAV_BAR_MENU,
} from './NavBarTypes';

const initialState: NavBarState = {
    anchorEl: null,
    menu: null,
    open: false,
};

export function navBarReducer(state: NavBarState = { ...initialState }, action: NavBarActionTypes): NavBarState {
    switch (action.type) {
        case OPEN_NAV_BAR_MENU:
            action = action as NavBarOpenActionType;
            return {
                ...state,
                anchorEl: action.anchorEl,
                menu: action.menu,
                open: true,
            };
        case CLOSE_NAV_BAR_MENU:
            action = action as NavBarCloseActionType;
            return {
                ...state,
                anchorEl: null,
                menu: null,
                open: false,
            };
        default:
            return state;
    }
}
