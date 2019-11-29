import { authReducer } from './auth/AuthReducer';
import { navBarReducer } from './navbar/NavBarReducer';
import { userDataReducer } from './userdata/UserDataReducer';
import { combineReducers } from 'redux';

export const reducer = combineReducers({ auth: authReducer, nav: navBarReducer, data: userDataReducer });
export type State = ReturnType<typeof reducer>;
