from typing import Optional, Tuple

import requests
from requests import Response

from AOGSbackend.albion.albion_api_models import AlbionApiSearchElement, AlbionApiMinimalPlayer
from AOGSbackend.utils.url_tools import url_join


class AlbionApi:
    BASE_URL: str = "https://albiononline.com/api/gameinfo/"

    @staticmethod
    def get_player_by_name(username: str) -> Optional[AlbionApiMinimalPlayer]:
        response: Response = requests.get(url_join(AlbionApi.BASE_URL, 'search'), params={'q': username})
        if not response.ok:
            return None
        validation: Tuple[AlbionApiSearchElement, bool] = AlbionApiSearchElement(response.json()).validate_and_build()
        (result, success) = validation
        if not success:
            return None
        elif len(result.players) > 0:
            return result.players[0]
        return None
