import {
    CLEAR_USER_DATA,
    ClearAlbionDataAction,
    SET_ALBION_PLAYERS,
    SetAlbionPlayersAction,
    AlbionState,
    AlbionReducedActions,
} from './AlbionTypes';

const initialState: AlbionState = {
    players: [],
};

export function albionReducer(state: AlbionState = { ...initialState }, action: AlbionReducedActions): AlbionState {
    switch (action.type) {
        case CLEAR_USER_DATA:
            action = action as ClearAlbionDataAction;
            return { ...initialState };
        case SET_ALBION_PLAYERS:
            action = action as SetAlbionPlayersAction;
            return {
                ...state,
                players: action.players,
            };
        default:
            return state;
    }
}
