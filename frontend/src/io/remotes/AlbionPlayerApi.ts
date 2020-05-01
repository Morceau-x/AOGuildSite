import { AlbionPlayerModel } from '../models/AlbionPlayerModel';
import { RemoteAddAlbionPlayersType, RemoteRemoveAlbionPlayersType } from '../../store/userdata/UserDataTypes';
import AxiosApi from './AxiosApi';
import { API_BASE_URL } from '../../Globals';

export default class AlbionPlayerApi extends AxiosApi {
    constructor() {
        super();
        this.network = this.withCsrf({
            baseURL: `${API_BASE_URL}albion/players/`,
        });
    }

    fetchAlbionPlayers = async (): Promise<AlbionPlayerModel[]> => {
        let { data } = await this.network.get('get/');
        return data;
    };

    addAlbionPlayer = async (postData: RemoteAddAlbionPlayersType): Promise<AlbionPlayerModel[]> => {
        let { data } = await this.network.post('add/', { player_name: postData.player_name });
        return data;
    };

    removeAlbionPlayer = async (postData: RemoteRemoveAlbionPlayersType): Promise<AlbionPlayerModel[]> => {
        let { data } = await this.network.post('remove/', { player_name: postData.player_name });
        return data;
    };
}
