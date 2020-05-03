import {
    AuthReducedActions,
    AuthState,
    LOG_IN_LOCAL,
    LOG_OUT_LOCAL,
    LogInLocalAction,
    LogOutLocalAction,
    SET_PERMISSIONS,
    SetPermissionsAction,
} from './AuthTypes';

const initialState: AuthState = {
    id: null,
    username: null,
    discriminator: null,
    authenticated: undefined,
    groups: [],
    permissions: [],
};

export function authReducer(state: AuthState = initialState, action: AuthReducedActions): AuthState {
    switch (action.type) {
        case LOG_IN_LOCAL:
            action = action as LogInLocalAction;
            return {
                ...state,
                id: action.id,
                username: action.username,
                discriminator: action.discriminator,
                authenticated: true,
            };
        case LOG_OUT_LOCAL:
            action = action as LogOutLocalAction;
            return {
                ...state,
                id: null,
                username: null,
                discriminator: null,
                authenticated: false,
            };
        case SET_PERMISSIONS:
            action = action as SetPermissionsAction;
            return {
                ...state,
                groups: action.groups,
                permissions: action.permissions,
            };
        default:
            return state;
    }
}
