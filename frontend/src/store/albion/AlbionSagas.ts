import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
    ADD_ALBION_PLAYER,
    AddAlbionPlayerAction,
    FETCH_ALBION_PLAYERS,
    REMOVE_ALBION_PLAYER,
    RemoveAlbionPlayerAction,
    setAlbionPlayers,
} from './AlbionTypes';

import AlbionPlayerRepository from '../../io/repositories/AlbionPlayerRepository';

const albionPlayerRepo = new AlbionPlayerRepository();

export function* fetchAlbionPlayerSaga() {
    try {
        const data = yield call(albionPlayerRepo.fetchAlbionPlayers);
        yield put(setAlbionPlayers(data));
    } catch (error) {
        yield put(setAlbionPlayers([]));
    }
}

export function* addAlbionPlayerSaga(action: AddAlbionPlayerAction) {
    try {
        const data = yield call(albionPlayerRepo.addAlbionPlayer, action);
        yield put(setAlbionPlayers(data));
    } catch (error) {
        yield put(setAlbionPlayers([]));
    }
}

export function* removeAlbionPlayerSaga(action: RemoveAlbionPlayerAction) {
    try {
        const data = yield call(albionPlayerRepo.removeAlbionPlayer, action);
        console.log(data);
        yield put(setAlbionPlayers(data));
    } catch (error) {
        yield put(setAlbionPlayers([]));
    }
}

export function* albionWatchers() {
    yield takeLatest(FETCH_ALBION_PLAYERS, fetchAlbionPlayerSaga);
    yield takeEvery(ADD_ALBION_PLAYER, addAlbionPlayerSaga);
    yield takeEvery(REMOVE_ALBION_PLAYER, removeAlbionPlayerSaga);
}
