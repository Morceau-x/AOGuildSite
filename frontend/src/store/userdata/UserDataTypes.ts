import { AlbionPlayerModel } from '../../io/models/AlbionPlayerModel';

export const CLEAR_USER_DATA = 'CLEAR_USER_DATA';
export const SET_ALBION_PLAYERS = 'SET_ALBION_PLAYERS';

export const REMOTE_FETCH_ALBION_PLAYER = 'REMOTE_FETCH_ALBION_PLAYER';
export const REMOTE_ADD_ALBION_PLAYER = 'REMOTE_ADD_ALBION_PLAYER';
export const REMOTE_REMOVE_ALBION_PLAYER = 'REMOTE_REMOVE_ALBION_PLAYER';

export interface UserDataState {
    players: AlbionPlayerModel[];
}

export interface ClearDataActionType {
    type: typeof CLEAR_USER_DATA;
}

export interface SetAlbionPlayersType {
    type: typeof SET_ALBION_PLAYERS;
    players: AlbionPlayerModel[];
}

export interface RemoteFetchAlbionPlayersType {
    type: typeof REMOTE_FETCH_ALBION_PLAYER;
}

export interface RemoteAddAlbionPlayersType {
    type: typeof REMOTE_ADD_ALBION_PLAYER;
    player_name: string;
}

export interface RemoteRemoveAlbionPlayersType {
    type: typeof REMOTE_REMOVE_ALBION_PLAYER;
    player_name: string;
}

export type UserDataTypes = ClearDataActionType | SetAlbionPlayersType;
