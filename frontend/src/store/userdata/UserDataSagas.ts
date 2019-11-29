import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
    REMOTE_ADD_ALBION_PLAYER,
    REMOTE_FETCH_ALBION_PLAYER,
    REMOTE_REMOVE_ALBION_PLAYER,
    RemoteAddAlbionPlayersType,
    RemoteRemoveAlbionPlayersType,
} from './UserDataTypes';
import { setUserDataAction } from './UserDataActions';
import AlbionPlayerRepository from '../../io/repositories/AlbionPlayerRepository';

const albionPlayerRepo = new AlbionPlayerRepository();

export function* fetchAlbionPlayerSaga() {
    try {
        const data = yield call(albionPlayerRepo.fetchAlbionPlayers);
        yield put(setUserDataAction(data));
    } catch (error) {
        yield put(setUserDataAction([]));
    }
}

export function* watchFetchAlbionPlayer() {
    yield takeLatest(REMOTE_FETCH_ALBION_PLAYER, fetchAlbionPlayerSaga);
}

export function* addAlbionPlayerSaga(action: RemoteAddAlbionPlayersType) {
    try {
        const data = yield call(albionPlayerRepo.addAlbionPlayer, action);
        yield put(setUserDataAction(data));
    } catch (error) {
        yield put(setUserDataAction([]));
    }
}

export function* watchAddAlbionPlayer() {
    yield takeEvery(REMOTE_ADD_ALBION_PLAYER, addAlbionPlayerSaga);
}

export function* removeAlbionPlayerSaga(action: RemoteRemoveAlbionPlayersType) {
    try {
        const data = yield call(albionPlayerRepo.removeAlbionPlayer, action);
        yield put(setUserDataAction(data));
    } catch (error) {
        yield put(setUserDataAction([]));
    }
}

export function* watchRemoveAlbionPlayer() {
    yield takeEvery(REMOTE_REMOVE_ALBION_PLAYER, removeAlbionPlayerSaga);
}

export const userDataWatchers = [watchFetchAlbionPlayer(), watchAddAlbionPlayer(), watchRemoveAlbionPlayer()];
