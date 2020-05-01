import { authReducer } from './auth/AuthReducer';
import { navBarReducer } from './navbar/NavBarReducer';
import { albionReducer } from './albion/AlbionReducer';
import { combineReducers } from 'redux';

export const reducer = combineReducers({ auth: authReducer, nav: navBarReducer, albion: albionReducer });
export type State = ReturnType<typeof reducer>;
