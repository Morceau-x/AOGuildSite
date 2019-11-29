import json
from typing import Dict, Union

import requests
from dataclasses import dataclass
from django.contrib.auth import authenticate
from django.contrib.auth.models import Group
from django.http import HttpRequest
from jsonschema import Draft7Validator

from AOGSbackend.utils.url_tools import url_join
from AOGSbackend.settings import CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, API_ENDPOINT, API_VERSION, SCOPES, GUILD_ID, BOT_TOKEN
from AccountManagement.discord.models.guild import Guild
from AccountManagement.models import UserModel


@dataclass
class ErrorData:
    error: str


class DiscordApi:
    user_schema: Dict = {
        "type": "object",
        "properties": {
            "id": {"type": "string"},
            "username": {"type": "string"},
            "discriminator": {"type": "string"},
            "avatar": {"type": ["string", "null"]},
        },
        "required": ["id", "username", "discriminator"]
    }

    guild_schema: Dict = {
        "type": "object",
        "required": ["id", "name", "region", "roles"],
        "properties": {
            "id": {"type": "string"},
            "name": {"type": "string"},
            "description": {"type": ["string", "null"]},
            "banner": {"type": ["string", "null"]},
            "icon": {"type": ["string", "null"]},
            "region": {"type": "string"},
            "roles": {
                "type": "array",
                "items": {
                    "type": "object",
                    "required": ["id", "name", "mentionable"],
                    "properties": {
                        "id": {"type": "string"},
                        "name": {"type": "string"},
                        "mentionable": {"type": "boolean"}
                    }
                }
            }
        }
    }

    members_schema: Dict = {
        "type": "array",
        "items": {
            "type": "object",
            "required": ["user", "nick", "roles"],
            "properties": {
                "user": user_schema,
                "nick": {"type": ["string", "null"]},
                "roles": {
                    "type": "array",
                    "items": {"type": "string"}
                }
            }
        }
    }

    @staticmethod
    def oauth_authentication_process(request: HttpRequest, code: str) -> Union[UserModel, ErrorData]:
        response = DiscordApi.post_oauth_tokens_request(code)
        if not response:
            return ErrorData("Could not access Discord auth service.")

        access_token = response.json()['access_token']

        user = DiscordApi.get_current_user(access_token).json()
        if not user:
            return ErrorData("Could not get user info from Discord.")
        if not Draft7Validator(DiscordApi.user_schema).is_valid(user):
            return ErrorData("User info from Discord does not have the right format: " + str(json.dumps(user)))
        return authenticate(request, user_id=user['id'], name=user['username'], discriminator=user['discriminator'], avatar=user['avatar'])

    @staticmethod
    def post_oauth_tokens_request(code: str):
        data = {
            'client_id': CLIENT_ID,
            'client_secret': CLIENT_SECRET,
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': REDIRECT_URI,  # + '?code=' + code + '&state=' + state,
            'scope': SCOPES
        }
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        return requests.post(url_join(API_ENDPOINT, API_VERSION, 'oauth2', 'token'), data=data, headers=headers)

    @staticmethod
    def get_current_user(access_token: str):
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + access_token
        }
        return requests.get(url_join(API_ENDPOINT, API_VERSION, 'users', '@me'), headers=headers)

    @staticmethod
    def get_guild_and_save_groups(user: UserModel):
        members_resp = requests.get('https://discordapp.com/api/v6/guilds/' + GUILD_ID + '/members?limit=1000', headers={'Authorization': 'Bot ' + BOT_TOKEN})
        guild_resp = requests.get('https://discordapp.com/api/v6/guilds/' + GUILD_ID, headers={'Authorization': 'Bot ' + BOT_TOKEN})
        if members_resp.ok \
                and guild_resp.ok \
                and Draft7Validator(DiscordApi.members_schema).is_valid(members_resp.json()) \
                and Draft7Validator(DiscordApi.guild_schema).is_valid(guild_resp.json()):
            guild = Guild(guild_resp.json(), members_resp.json())
            DiscordApi.set_groups(user, guild)

    @staticmethod
    def set_groups(user: UserModel, guild: Guild):
        user.groups.clear()
        for key in guild.roles:
            group, _ = Group.objects.get_or_create(name=guild.roles[key].name)
            if key in guild.members.get(user.user_id).roles:
                user.groups.add(group)
