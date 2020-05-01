from django.http import HttpRequest, HttpResponse
from django.views.decorators.http import require_GET, require_POST

from AOGSbackend.decorators.authenticated_decorator import authenticated
from AlbionPlayer.models import AlbionPlayer
from AlbionPlayer.view_helpers import return_players_helper, check_player_post_helper


@authenticated
@require_GET
def get_players(request: HttpRequest) -> HttpResponse:
    return return_players_helper(request)


@authenticated
@require_POST
def add_players(request: HttpRequest) -> HttpResponse:
    data = check_player_post_helper(request)
    if data is not None:
        exists = AlbionPlayer.objects.filter(user=request.user, player_id=data.id).exists()
        player = AlbionPlayer(player_id=data.id, name=data.name, user=request.user)
        if not exists:
            player.save()
    return return_players_helper(request)


@authenticated
@require_POST
def remove_players(request: HttpRequest) -> HttpResponse:
    data = check_player_post_helper(request)
    player = None
    if data is not None:
        player = AlbionPlayer.objects.get(player_id=data.id, user=request.user)
        if player is not None:
            player.delete()
    return return_players_helper(request, ignore=player)
