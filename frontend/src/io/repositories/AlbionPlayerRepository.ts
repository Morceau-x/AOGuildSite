import AlbionPlayerApi from '../remotes/AlbionPlayerApi';
import { RemoteAddAlbionPlayersType, RemoteRemoveAlbionPlayersType } from '../../store/userdata/UserDataTypes';

export default class AlbionPlayerRepository {
    remote: AlbionPlayerApi;

    constructor() {
        this.remote = new AlbionPlayerApi();
    }

    fetchAlbionPlayers = (): Promise<any> => {
        return this.remote.fetchAlbionPlayers();
    };

    addAlbionPlayer = (data: RemoteAddAlbionPlayersType): Promise<any> => {
        return this.remote.addAlbionPlayer(data);
    };

    removeAlbionPlayer = (data: RemoteRemoveAlbionPlayersType): Promise<any> => {
        return this.remote.removeAlbionPlayer(data);
    };
}
