export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const FETCH_USER = 'FETCH_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const SET_USER_PERMISSIONS = 'SET_USER_PERMISSIONS';
export const GET_USER_PERMISSIONS = 'GET_USER_PERMISSIONS';

export interface AuthState {
    id: string;
    username: string;
    discriminator: string;
    authenticated: boolean | undefined;
    groups: [];
    permissions: string[];
}

export interface LogInActionType {
    type: typeof LOG_IN;
    id: string;
    username: string;
    discriminator: string;
}

export interface LogOutActionType {
    type: typeof LOG_OUT;
}

export interface SetPermissionsActionType {
    type: typeof SET_USER_PERMISSIONS;
    groups: [];
    permissions: string[];
}

export type AuthActionTypes = LogInActionType | LogOutActionType | SetPermissionsActionType;
