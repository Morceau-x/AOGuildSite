import { call, put, takeLatest } from 'redux-saga/effects';
import { FETCH_USER, FETCH_PERMISSIONS, LOG_OUT_REMOTE, logInLocal, logOutLocal, setPermissions } from './AuthTypes';
import AuthRepository from '../../io/repositories/AuthRepository';
import { clearAlbionData } from '../albion/AlbionTypes';

const authRepo = new AuthRepository();

export function* fetchUserSaga() {
    try {
        const data = yield call(authRepo.fetchUser);
        yield put(logInLocal(data.id, data.username, data.discriminator));
    } catch (error) {
        yield put(logOutLocal());
        yield put(clearAlbionData());
    }
}

export function* logOutUserSaga() {
    try {
        yield call(authRepo.logOutUser);
        yield put(logOutLocal());
        yield put(clearAlbionData());
    } catch (error) {}
}

export function* getUserPermissionsSaga() {
    try {
        const data = yield call(authRepo.getUserPermissions);
        yield put(setPermissions(data));
    } catch (error) {}
}

export function* userWatchers() {
    yield takeLatest(FETCH_USER, fetchUserSaga);
    yield takeLatest(LOG_OUT_REMOTE, logOutUserSaga);
    yield takeLatest(FETCH_PERMISSIONS, getUserPermissionsSaga);
}
