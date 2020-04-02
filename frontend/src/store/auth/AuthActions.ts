import {
    AuthActionTypes,
    FETCH_USER,
    GET_USER_PERMISSIONS,
    LOG_IN,
    LOG_OUT,
    LogInActionType,
    LOGOUT_USER,
    LogOutActionType,
    SET_USER_PERMISSIONS,
    SetPermissionsActionType,
} from './AuthTypes';

export function logInAction(id: string, username: string, discriminator: string): LogInActionType {
    return {
        type: LOG_IN,
        id: id,
        username: username,
        discriminator: discriminator,
    };
}

export function logOutAction(): LogOutActionType {
    return {
        type: LOG_OUT,
    };
}

export function setUserPermissionsAction(data: { groups: []; permissions: string[] }): SetPermissionsActionType {
    return {
        type: SET_USER_PERMISSIONS,
        groups: data.groups,
        permissions: data.permissions,
    };
}

export function fetchUserAction() {
    return {
        type: FETCH_USER,
    };
}

export function logOutUserAction() {
    return {
        type: LOGOUT_USER,
    };
}

export function getUserPermissionsAction() {
    return {
        type: GET_USER_PERMISSIONS,
    };
}
