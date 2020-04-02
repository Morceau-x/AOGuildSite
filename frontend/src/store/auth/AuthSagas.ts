import { call, put, takeLatest } from 'redux-saga/effects';
import { FETCH_USER, GET_USER_PERMISSIONS, LOGOUT_USER } from './AuthTypes';
import { logInAction, logOutAction, setUserPermissionsAction } from './AuthActions';
import { clearUserDataAction } from '../userdata/UserDataActions';
import AuthRepository from '../../io/repositories/AuthRepository';

const authRepo = new AuthRepository();

export function* fetchUserSaga() {
    try {
        const data = yield call(authRepo.fetchUser);
        yield put(logInAction(data.id, data.username, data.discriminator));
    } catch (error) {
        yield put(logOutAction());
        yield put(clearUserDataAction());
    }
}

export function* watchFetchUser() {
    yield takeLatest(FETCH_USER, fetchUserSaga);
}

export function* logOutUserSaga() {
    try {
        yield call(authRepo.logOutUser);
        yield put(logOutAction());
        yield put(clearUserDataAction());
    } catch (error) {}
}

export function* watchLogOutUser() {
    yield takeLatest(LOGOUT_USER, logOutUserSaga);
}

export function* getUserPermissionsSaga() {
    try {
        const data = yield call(authRepo.getUserPermissions);
        yield put(setUserPermissionsAction(data));
    } catch (error) {}
}

export function* watchGetUserPermissions() {
    yield takeLatest(GET_USER_PERMISSIONS, getUserPermissionsSaga);
}

export const userWatchers = [watchFetchUser(), watchLogOutUser(), watchGetUserPermissions()];
