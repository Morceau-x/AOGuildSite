import { RemoteAddAlbionPlayersType, RemoteRemoveAlbionPlayersType } from '../../store/userdata/UserDataTypes';
import AuthApi from '../remotes/AuthApi';

export default class AuthRepository {
    remote: AuthApi;

    constructor() {
        this.remote = new AuthApi();
    }

    fetchUser = (): Promise<any> => {
        return this.remote.fetchUser();
    };

    logOutUser = (): Promise<any> => {
        return this.remote.logOutUser();
    };

    getUserPermissions = (): Promise<any> => {
        return this.remote.getUserPermissions();
    };
}
