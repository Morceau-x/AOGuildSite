import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import EventsRepository from '../../io/repositories/EventsRepository';
import { CANCEL_EVENT, CancelEventAction, FETCH_EVENTS, setEvents } from './EventsTypes';

const eventsRepo = new EventsRepository();

export function* fetchEventsSaga() {
    try {
        const data = yield call(eventsRepo.fetchEvents);
        yield put(setEvents(data));
    } catch (error) {
        yield put(setEvents(undefined));
    }
}

export function* cancelEventSaga(action: CancelEventAction) {
    try {
        const data = yield call(eventsRepo.cancelEvents, action);
        yield put(setEvents(data));
    } catch (error) {}
}

export function* eventsWatchers() {
    yield takeLatest(FETCH_EVENTS, fetchEventsSaga);
    yield takeEvery(CANCEL_EVENT, cancelEventSaga);
}
