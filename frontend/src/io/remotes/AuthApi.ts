import AxiosApi from './AxiosApi';
import { API_BASE_URL } from '../../Globals';

export default class AuthApi extends AxiosApi {
    constructor() {
        super();
        this.network = this.withCsrf({
            baseURL: `${API_BASE_URL}auth/`,
        });
    }

    fetchUser = (): Promise<any> => {
        return this.basicGetData(this.network, 'user/');
    };

    logOutUser = (): Promise<any> => {
        return this.basicPostData(this.network, 'logout/', undefined);
    };

    getUserPermissions = (): Promise<any> => {
        return this.basicGetData(this.network, 'user/permissions/');
    };
}
