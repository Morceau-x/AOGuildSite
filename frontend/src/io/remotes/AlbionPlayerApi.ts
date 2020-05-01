import { AlbionPlayerModel } from '../../models/AlbionPlayerModel';
import { AddAlbionPlayerAction, RemoveAlbionPlayerAction } from '../../store/albion/AlbionTypes';
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

    addAlbionPlayer = async (postData: AddAlbionPlayerAction): Promise<AlbionPlayerModel[]> => {
        let { data } = await this.network.post('add/', { player_name: postData.player_name });
        return data;
    };

    removeAlbionPlayer = async (postData: RemoveAlbionPlayerAction): Promise<AlbionPlayerModel[]> => {
        let { data } = await this.network.post('remove/', { player_name: postData.player_name });
        return data;
    };
}
