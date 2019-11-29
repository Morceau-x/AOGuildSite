import AxiosApi from './AxiosApi';

export default class AuthApi extends AxiosApi {
    constructor() {
        super();
        this.network = this.withCsrf({
            baseURL: 'https://api.tsf-albion.fr/auth/',
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
