import json
from typing import List

from django.db.models import QuerySet
from django.http import HttpRequest, HttpResponse, JsonResponse
from django.views.decorators.http import require_GET, require_POST
from psycopg2._psycopg import IntegrityError

from AOGSbackend.albion.albion_api import AlbionApi
from AOGSbackend.decorators.authenticated_decorator import authenticated
from AOGSbackend.utils.http_tools import error_response
from AlbionPlayer.models import AlbionPlayer


@authenticated
@require_GET
def get_players(request: HttpRequest) -> HttpResponse:
    albion_players_list: List[AlbionPlayer] = list(AlbionPlayer.objects.filter(user=request.user))
    players = [{"player_id": player.player_id} for player in albion_players_list]
    return JsonResponse(players, safe=False)


@authenticated
@require_POST
def add_players(request: HttpRequest) -> HttpResponse:
    name: str = json.loads(request.body).get("player_name")
    if name is None or len(name.strip()) < 1:
        return error_response("Unprocessable Entity", "The player could not be added", 422)
    data = AlbionApi.search_player_by_name(name)
    if data is None:
        return error_response("Unprocessable Entity", "The player could not be added", 422)

    player = AlbionPlayer(player_id=data.id, name=data.name, user=request.user)
    try:
        player.save()
    except:
        pass
    albion_players_list: List[AlbionPlayer] = list(AlbionPlayer.objects.filter(user=request.user))
    players = [{"player_id": player.player_id} for player in albion_players_list]
    return JsonResponse(players, safe=False)


@authenticated
@require_POST
def remove_players(request: HttpRequest) -> HttpResponse:
    name: str = json.loads(request.body).get("player_name")
    if name is None or len(name.strip()) < 1:
        return error_response("Unprocessable Entity", "The player could not be added", 422)
    data = AlbionApi.search_player_by_name(name)
    if data is None:
        return error_response("Unprocessable Entity", "The player could not be added", 422)
    player = AlbionPlayer.objects.get(player_id=data.id, user=request.user)
    player.delete()
    albion_players_list: List[AlbionPlayer] = list(AlbionPlayer.objects.filter(user=request.user))
    players = [{"player_id": player.player_id} for player in albion_players_list]
    return JsonResponse(players, safe=False)
