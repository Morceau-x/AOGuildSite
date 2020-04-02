import { CLEAR_USER_DATA, ClearDataActionType, SET_ALBION_PLAYERS, SetAlbionPlayersType, UserDataState, UserDataTypes } from './UserDataTypes';

const initialState: UserDataState = {
    players: [],
};

export function userDataReducer(state: UserDataState = { ...initialState }, action: UserDataTypes): UserDataState {
    switch (action.type) {
        case CLEAR_USER_DATA:
            action = action as ClearDataActionType;
            return { ...initialState };
        case SET_ALBION_PLAYERS:
            action = action as SetAlbionPlayersType;
            return {
                ...state,
                players: action.players,
            };
        default:
            return state;
    }
}
