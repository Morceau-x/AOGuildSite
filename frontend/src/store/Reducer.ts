import { authReducer } from './auth/AuthReducer';
import { navBarReducer } from './navbar/NavBarReducer';
import { albionReducer } from './albion/AlbionReducer';
import { combineReducers } from 'redux';
import { eventsReducer } from './events/EventsReducer';

export const reducer = combineReducers({
    auth: authReducer,
    nav: navBarReducer,
    albion: albionReducer,
    events: eventsReducer,
});
export type State = ReturnType<typeof reducer>;
