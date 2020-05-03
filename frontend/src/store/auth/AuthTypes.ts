export const LOG_IN_LOCAL = 'LOG_IN_LOCAL';
export const LOG_OUT_LOCAL = 'LOG_OUT_LOCAL';
export const SET_PERMISSIONS = 'SET_PERMISSIONS';
export const FETCH_USER = 'FETCH_USER';
export const FETCH_PERMISSIONS = 'FETCH_PERMISSIONS';
export const LOG_OUT_REMOTE = 'LOG_OUT_REMOTE';

//////////////////////////////////////////////////////////////
/// State
//////////////////////////////////////////////////////////////

export interface AuthState {
    id: string;
    username: string;
    discriminator: string;
    authenticated: boolean | undefined;
    groups: [];
    permissions: string[];
}

//////////////////////////////////////////////////////////////
/// Reduced actions
//////////////////////////////////////////////////////////////

export interface LogInLocalAction {
    type: typeof LOG_IN_LOCAL;
    id: string;
    username: string;
    discriminator: string;
}

export function logInLocal(id: string, username: string, discriminator: string): LogInLocalAction {
    return {
        type: LOG_IN_LOCAL,
        id: id,
        username: username,
        discriminator: discriminator,
    };
}

export interface LogOutLocalAction {
    type: typeof LOG_OUT_LOCAL;
}

export function logOutLocal(): LogOutLocalAction {
    return {
        type: LOG_OUT_LOCAL,
    };
}

export interface SetPermissionsAction {
    type: typeof SET_PERMISSIONS;
    groups: [];
    permissions: string[];
}

export function setPermissions(data: { groups: []; permissions: string[] }): SetPermissionsAction {
    return {
        type: SET_PERMISSIONS,
        groups: data.groups,
        permissions: data.permissions,
    };
}

export type AuthReducedActions = LogInLocalAction | LogOutLocalAction | SetPermissionsAction;

//////////////////////////////////////////////////////////////
/// Saga actions
//////////////////////////////////////////////////////////////

export interface FetchUserAction {
    type: typeof FETCH_USER;
}

export function fetchUser(): FetchUserAction {
    return {
        type: FETCH_USER,
    };
}

export interface LogOutRemoteAction {
    type: typeof LOG_OUT_REMOTE;
}

export function logOutRemote(): LogOutRemoteAction {
    return {
        type: LOG_OUT_REMOTE,
    };
}

export interface FetchPermissionsAction {
    type: typeof FETCH_PERMISSIONS;
}

export function fetchPermissions(): FetchPermissionsAction {
    return {
        type: FETCH_PERMISSIONS,
    };
}
