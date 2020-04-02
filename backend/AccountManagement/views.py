from typing import Union

from django.contrib.auth import login, logout
from django.http import HttpResponse, HttpRequest, JsonResponse
from django.shortcuts import redirect
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET, require_POST

from AOGSbackend.decorators.authenticated_decorator import authenticated
from AOGSbackend.settings import AUTHORIZE_URI
from AOGSbackend.utils.http_tools import error_response
from AOGSbackend.utils.state import State, StateValue, StateTypes
from AOGSbackend.utils.url_tools import set_params, add_params
from AccountManagement.discord.discord_api import DiscordApi, ErrorData
from AccountManagement.models import UserModel

states = State()


@require_POST
@csrf_exempt
def authorize_request(request: HttpRequest) -> HttpResponse:
    redirect_uri: str = request.POST['redirect_uri']
    if not redirect_uri:
        return error_response("Unprocessable Entity", "Required redirect_uri field not found", 422)
    if request.user.is_authenticated:
        return redirect(redirect_uri, permanent=True)
    key = states.add(StateValue(redirect_uri, StateTypes.AUTHORIZE))
    return redirect(add_params(AUTHORIZE_URI, state=key), permanent=True)


@require_GET
def authorization_complete(request: HttpRequest) -> HttpResponse:
    """
    Should only be called by Discord API.
    Used as redirection target when user authorizes this application in his profile.
    :param request:
    :return:
    """
    code = request.GET["code"]
    state = request.GET["state"]
    if state not in states or not states[state].state_type == StateTypes.AUTHORIZE:
        return error_response("Unprocessable Entity", "State is not valid", 422)
    redirect_uri = states[state].redirect_uri
    del states[state]
    result: Union[UserModel, ErrorData] = DiscordApi.oauth_authentication_process(request, code)
    if not isinstance(result, UserModel):
        return redirect(set_params(redirect_uri, error=result.error), permanent=True)
    if result is not None:
        logout(request)
        login(request, result)
    DiscordApi.get_guild_and_save_groups(result)
    return redirect(set_params(redirect_uri, user=result.name + '#' + result.discriminator), permanent=True)


@authenticated
@require_GET
def get_user(request: HttpRequest) -> HttpResponse:
    user = request.user
    content = {
        "id": user.user_id,
        "username": user.name,
        "discriminator": user.discriminator,
    }
    return JsonResponse(content)


@authenticated
@require_POST
def logout_user(request: HttpRequest) -> HttpResponse:
    logout(request)
    return JsonResponse({"status": "success"})


@authenticated
@require_GET
def get_permissions(request: HttpRequest) -> HttpResponse:
    groups = [group.name for group in request.user.groups.all()]
    permissions = list(request.user.get_all_permissions())
    return JsonResponse({"groups": groups, "permissions": permissions})
