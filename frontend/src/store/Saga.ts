import { all } from 'redux-saga/effects';
import { userWatchers } from './auth/AuthSagas';
import { albionWatchers } from './albion/AlbionSagas';

export const rootSaga = function* root() {
    yield all([userWatchers(), albionWatchers()]);
};
