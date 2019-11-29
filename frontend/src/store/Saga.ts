import { all } from 'redux-saga/effects';
import { userWatchers } from './auth/AuthSagas';
import { userDataWatchers } from './userdata/UserDataSagas';

export const rootSaga = function* root() {
    yield all([...userWatchers, ...userDataWatchers]);
};
