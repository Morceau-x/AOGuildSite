import {
    AuthActionTypes,
    AuthState,
    LOG_IN,
    LOG_OUT,
    LogInActionType,
    LogOutActionType,
    SET_USER_PERMISSIONS,
    SetPermissionsActionType,
} from './AuthTypes';

const initialState: AuthState = {
    id: null,
    username: null,
    discriminator: null,
    authenticated: undefined,
    groups: [],
    permissions: [],
};

export function authReducer(state: AuthState = initialState, action: AuthActionTypes): AuthState {
    switch (action.type) {
        case LOG_IN:
            action = action as LogInActionType;
            return {
                ...state,
                id: action.id,
                username: action.username,
                discriminator: action.discriminator,
                authenticated: true,
            };
        case LOG_OUT:
            action = action as LogOutActionType;
            return {
                ...state,
                id: null,
                username: null,
                discriminator: null,
                authenticated: process.env.NODE_ENV == 'development',
            };
        case SET_USER_PERMISSIONS:
            action = action as SetPermissionsActionType;
            return {
                ...state,
                groups: action.groups,
                permissions: action.permissions,
            };
        default:
            return state;
    }
}
