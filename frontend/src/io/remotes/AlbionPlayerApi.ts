import { AlbionPlayerModel } from '../models/AlbionPlayerModel';
import { RemoteAddAlbionPlayersType, RemoteRemoveAlbionPlayersType } from '../../store/userdata/UserDataTypes';
import axios from 'axios';
import AxiosApi from './AxiosApi';

export default class AlbionPlayerApi extends AxiosApi {
    constructor() {
        super();
        this.network = this.withCsrf({
            baseURL: 'https://api.tsf-albion.fr/albion/players/',
        });
    }

    fetchAlbionPlayers = async (): Promise<AlbionPlayerModel[]> => {
        let { data } = await this.network.get('get/');
        return this.fetchPlayersData(data);
    };

    addAlbionPlayer = async (postData: RemoteAddAlbionPlayersType): Promise<AlbionPlayerModel[]> => {
        let { data } = await this.network.post('add/', { player_name: postData.player_name });
        return this.fetchPlayersData(data);
    };

    removeAlbionPlayer = async (postData: RemoteRemoveAlbionPlayersType): Promise<AlbionPlayerModel[]> => {
        let { data } = await this.network.post('remove/', { player_name: postData.player_name });
        return this.fetchPlayersData(data);
    };

    fetchPlayersData = async (data: { player_id: string; [key: string]: any }[]): Promise<AlbionPlayerModel[]> => {
        const result: AlbionPlayerModel[] = [];
        for (let item of data) {
            try {
                let { playerData } = await this.fetchAlbionPlayerData(item.player_id);
                if (playerData)
                    result.push({
                        id: playerData.Id,
                        name: playerData.Name,
                        guild: playerData.GuildName,
                        killFame: playerData.KillFame,
                        deathFame: playerData.DeathFame,
                        fameRatio: playerData.FameRatio,
                        pveFame: playerData.LifetimeStatistics.PvE.Total,
                        gatheringFame: playerData.LifetimeStatistics.Gathering.All.Total,
                        craftingFame: playerData.LifetimeStatistics.Crafting.Total,
                    });
            } catch (_) {}
        }
        return result;
    };

    fetchAlbionPlayerData = (id: string): Promise<any> => {
        return fetch('https://gameinfo.albiononline.com/api/gameinfo/players/' + id, {
            mode: 'no-cors',
        });
    };
}
