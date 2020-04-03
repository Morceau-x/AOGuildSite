from typing import Optional, Tuple, List, Dict

import requests
from requests import Response

from AOGSbackend.albion.albion_api_models import AlbionApiSearchElement, AlbionApiMinimalPlayer, AlbionApiPlayer
from AOGSbackend.utils.url_tools import url_join


class AlbionApi:
    GLOBAL_BASE_URL: str = "https://albiononline.com/api/gameinfo/"
    PLAYERS_BASE_URL: str = "https://gameinfo.albiononline.com/api/gameinfo/"

    @staticmethod
    def search_player_by_name(username: str) -> Optional[AlbionApiMinimalPlayer]:
        response: Response = requests.get(url_join(AlbionApi.GLOBAL_BASE_URL, 'search'), params={'q': username})
        if not response.ok:
            return None
        validation: Tuple[AlbionApiSearchElement, bool] = AlbionApiSearchElement(response.json()).validate_and_build()
        (result, success) = validation
        if not success:
            return None
        elif len(result.players) > 0:
            return result.players[0]
        return None

    @staticmethod
    def get_player_data(player_id: str) -> Optional[AlbionApiPlayer]:
        response: Response = requests.get(url_join(AlbionApi.PLAYERS_BASE_URL, 'players', player_id))
        if not response.ok:
            return None
        validation: Tuple[AlbionApiPlayer, bool] = AlbionApiPlayer(response.json()).validate_and_build()
        (result, success) = validation
        if not success:
            return None
        return result

    @staticmethod
    def get_all_players_data(player_ids: List[str]) -> List[Dict]:
        ret = []
        for player_id in player_ids:
            result = AlbionApi.get_player_data(player_id)
            if result is not None:
                ret.append({
                    "id": result.id,
                    "name": result.name,
                    "guild": result.guild_name,
                    "killFame": result.kill_fame,
                    "deathFame": result.death_fame,
                    "fameRatio": result.fame_ratio,
                    "pveFame": result.pve_fame,
                    "gatheringFame": result.gathering_fame,
                    "craftingFame": result.crafting_fame,
                })

        return ret
