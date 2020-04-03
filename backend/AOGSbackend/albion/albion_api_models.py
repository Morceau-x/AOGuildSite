from abc import ABC, abstractmethod
from typing import Dict, List, Union

from jsonschema import Draft7Validator


class AlbionApiModel(ABC):
    SCHEMA: Dict = {}
    data: Union[List, Dict]

    def __init__(self, data: Dict):
        self.SCHEMA = self.__class__.SCHEMA
        self.data = data

    def is_valid(self, data: Union[List, Dict] = None):
        return Draft7Validator(self.SCHEMA).is_valid(self.data if data is None else data)

    def validate_and_build(self) -> ('AlbionApiModel', bool):
        built = False
        if self.is_valid():
            self.build()
            built = True
        return self, built

    @abstractmethod
    def build(self) -> 'AlbionApiModel':
        pass


class AlbionApiMinimalPlayer(AlbionApiModel):
    id: str
    name: str
    guild_id: str
    guild_name: str

    SCHEMA: Dict = {
        "type": "object",
        "properties": {
            "Id": {"type": "string"},
            "Name": {"type": "string"},
            "GuildId": {"type": "string"},
            "GuildName": {"type": "string"},
        },
        "required": ["Id", "Name", "GuildId", "GuildName"]
    }

    def __init__(self, data: Dict):
        super().__init__(data)

    def build(self) -> 'AlbionApiMinimalPlayer':
        self.id = self.data.get("Id")
        self.name = self.data.get("Name")
        self.guild_id = self.data.get("GuildId")
        self.guild_name = self.data.get("GuildName")
        return self

    def validate_and_build(self) -> 'AlbionApiMinimalPlayer':
        return self


class AlbionApiMinimalGuild(AlbionApiModel):
    id: str
    name: str

    SCHEMA: Dict = {
        "type": "object",
        "properties": {
            "Id": {"type": "string"},
            "Name": {"type": "string"},
        },
        "required": ["Id", "Name"]
    }

    def __init__(self, data: Union[List, Dict]):
        super().__init__(data)


class AlbionApiSearchElement(AlbionApiModel):
    guilds: List[AlbionApiMinimalGuild]
    players: List[AlbionApiMinimalPlayer]

    SCHEMA: Dict = {
        "type": "object",
        "properties": {
            "guilds": {
                "type": "array",
                "items": AlbionApiMinimalGuild.SCHEMA
            },
            "players": {
                "type": "array",
                "items": AlbionApiMinimalPlayer.SCHEMA
            },
        },
        "required": ["guilds", "players"]
    }

    def __init__(self, data: Dict):
        super().__init__(data)

    def build(self):
        guilds_array = self.data.get("guilds")
        self.guilds = [AlbionApiMinimalGuild(guild).build() for guild in guilds_array]

        players_array = self.data.get("players")
        self.players = [AlbionApiMinimalPlayer(player).build() for player in players_array]

        return self