import { AlbionPlayerModel } from '../../models/AlbionPlayerModel';

export const CLEAR_USER_DATA = 'CLEAR_USER_DATA';
export const SET_ALBION_PLAYERS = 'SET_ALBION_PLAYERS';

export const FETCH_ALBION_PLAYERS = 'FETCH_ALBION_PLAYERS';
export const ADD_ALBION_PLAYER = 'ADD_ALBION_PLAYER';
export const REMOVE_ALBION_PLAYER = 'REMOVE_ALBION_PLAYER';

//////////////////////////////////////////////////////////////
/// State
//////////////////////////////////////////////////////////////

export interface AlbionState {
    players: AlbionPlayerModel[];
}

//////////////////////////////////////////////////////////////
/// Reduced actions
//////////////////////////////////////////////////////////////

export interface ClearAlbionDataAction {
    type: typeof CLEAR_USER_DATA;
}

export function clearAlbionData(): ClearAlbionDataAction {
    return {
        type: CLEAR_USER_DATA,
    };
}

export interface SetAlbionPlayersAction {
    type: typeof SET_ALBION_PLAYERS;
    players: AlbionPlayerModel[];
}

export function setAlbionPlayers(players: AlbionPlayerModel[]): SetAlbionPlayersAction {
    return {
        type: SET_ALBION_PLAYERS,
        players: players,
    };
}

export type AlbionReducedActions = ClearAlbionDataAction | SetAlbionPlayersAction;

//////////////////////////////////////////////////////////////
/// Saga actions
//////////////////////////////////////////////////////////////

export interface FetchAlbionPlayersAction {
    type: typeof FETCH_ALBION_PLAYERS;
}

export function fetchAlbionPlayers(): FetchAlbionPlayersAction {
    return {
        type: FETCH_ALBION_PLAYERS,
    };
}

export interface AddAlbionPlayerAction {
    type: typeof ADD_ALBION_PLAYER;
    player_name: string;
}

export function addAlbionPlayer(player_name: string): AddAlbionPlayerAction {
    return {
        type: ADD_ALBION_PLAYER,
        player_name: player_name,
    };
}

export interface RemoveAlbionPlayerAction {
    type: typeof REMOVE_ALBION_PLAYER;
    player_name: string;
}

export function remoteRemoveAlbionPlayerAction(player_name: string): RemoveAlbionPlayerAction {
    return {
        type: REMOVE_ALBION_PLAYER,
        player_name: player_name,
    };
}
