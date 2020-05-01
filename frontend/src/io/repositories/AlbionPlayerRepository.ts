import AlbionPlayerApi from '../remotes/AlbionPlayerApi';
import { AddAlbionPlayerAction, RemoveAlbionPlayerAction } from '../../store/albion/AlbionTypes';

export default class AlbionPlayerRepository {
    remote: AlbionPlayerApi;

    constructor() {
        this.remote = new AlbionPlayerApi();
    }

    fetchAlbionPlayers = (): Promise<any> => {
        return this.remote.fetchAlbionPlayers();
    };

    addAlbionPlayer = (data: AddAlbionPlayerAction): Promise<any> => {
        return this.remote.addAlbionPlayer(data);
    };

    removeAlbionPlayer = (data: RemoveAlbionPlayerAction): Promise<any> => {
        return this.remote.removeAlbionPlayer(data);
    };
}
