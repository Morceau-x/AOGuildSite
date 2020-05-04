import EventModel from '../../models/EventModel';

export const SET_EVENTS = 'SET_EVENTS';
export const FETCH_EVENTS = 'FETCH_EVENTS';
export const CANCEL_EVENT = 'CANCEL_EVENT';

//////////////////////////////////////////////////////////////
/// State
//////////////////////////////////////////////////////////////

export interface EventsState {
    events?: EventModel[];
}

//////////////////////////////////////////////////////////////
/// Reduced actions
//////////////////////////////////////////////////////////////

export interface SetEventsAction {
    type: typeof SET_EVENTS;
    events: EventModel[];
}

export function setEvents(events: EventModel[]): SetEventsAction {
    return {
        type: SET_EVENTS,
        events: events,
    };
}

export type EventsReducedActions = SetEventsAction;

//////////////////////////////////////////////////////////////
/// Saga actions
//////////////////////////////////////////////////////////////

export interface FetchEventsAction {
    type: typeof FETCH_EVENTS;
}

export function fetchEvents(): FetchEventsAction {
    return {
        type: FETCH_EVENTS,
    };
}

export interface CancelEventAction {
    type: typeof CANCEL_EVENT;
    eventId: string;
}

export function cancelEvent(eventId: string): CancelEventAction {
    return {
        type: CANCEL_EVENT,
        eventId: eventId,
    };
}
