import { all } from 'redux-saga/effects';
import { userWatchers } from './auth/AuthSagas';
import { albionWatchers } from './albion/AlbionSagas';
import { eventsWatchers } from './events/EventsSagas';

export const rootSaga = function* root() {
    yield all([userWatchers(), albionWatchers(), eventsWatchers()]);
};
