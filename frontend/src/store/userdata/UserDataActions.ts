import {
    CLEAR_USER_DATA,
    ClearDataActionType,
    REMOTE_ADD_ALBION_PLAYER,
    REMOTE_FETCH_ALBION_PLAYER,
    REMOTE_REMOVE_ALBION_PLAYER,
    RemoteAddAlbionPlayersType,
    RemoteFetchAlbionPlayersType,
    RemoteRemoveAlbionPlayersType,
    SET_ALBION_PLAYERS,
    SetAlbionPlayersType,
} from './UserDataTypes';
import { AlbionPlayerModel } from '../../io/models/AlbionPlayerModel';

export function clearUserDataAction(): ClearDataActionType {
    return {
        type: CLEAR_USER_DATA,
    };
}

export function setUserDataAction(players: AlbionPlayerModel[]): SetAlbionPlayersType {
    return {
        type: SET_ALBION_PLAYERS,
        players: players,
    };
}

export function remoteFetchAlbionPlayerAction(): RemoteFetchAlbionPlayersType {
    return {
        type: REMOTE_FETCH_ALBION_PLAYER,
    };
}

export function remoteAddAlbionPlayerAction(player_id: string): RemoteAddAlbionPlayersType {
    return {
        type: REMOTE_ADD_ALBION_PLAYER,
        player_id: player_id,
    };
}

export function remoteRemoveAlbionPlayerAction(player_id: string): RemoteRemoveAlbionPlayersType {
    return {
        type: REMOTE_REMOVE_ALBION_PLAYER,
        player_id: player_id,
    };
}
