import json
from typing import List, Optional

from django.http import HttpRequest, JsonResponse

from AOGSbackend.albion.albion_api import AlbionApi
from AOGSbackend.albion.albion_api_models import AlbionApiMinimalPlayer
from AlbionPlayer.models import AlbionPlayer


def return_players_helper(request: HttpRequest):
    albion_players_list: List[AlbionPlayer] = list(AlbionPlayer.objects.filter(user=request.user))
    player_ids = [player.player_id for player in albion_players_list]
    return JsonResponse(AlbionApi.get_all_players_data(player_ids), safe=False)


def check_player_post_helper(request: HttpRequest) -> Optional[AlbionApiMinimalPlayer]:
    name: str = json.loads(request.body).get("player_name")
    if name is None or len(name.strip()) < 1:
        return None
    data = AlbionApi.search_player_by_name(name)
    if data is None:
        return None
    return data
