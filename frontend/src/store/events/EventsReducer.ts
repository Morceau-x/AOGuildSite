import { EventsReducedActions, EventsState, SET_EVENTS, SetEventsAction } from './EventsTypes';

const initialState: EventsState = {
    events: undefined,
};

export function eventsReducer(state: EventsState = initialState, action: EventsReducedActions): EventsState {
    switch (action.type) {
        case SET_EVENTS:
            action = action as SetEventsAction;
            return {
                ...state,
                events: action.events,
            };
        default:
            return state;
    }
}
