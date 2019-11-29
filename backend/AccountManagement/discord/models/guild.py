import json
from json import JSONEncoder
from typing import List, Dict, Optional, Any

from AccountManagement.discord.models.member import Member
from AccountManagement.discord.models.role import Role


class ObjectEncoder(JSONEncoder):
    def default(self, o: Any) -> Dict[str, Any]:
        return o.__dict__


class Guild:
    id: str
    name: str
    description: Optional[str]
    banner: Optional[str]
    icon: Optional[str]
    region: str
    roles: Dict[str, Role]
    default_role: Role
    members_resp: Dict[str, Member]

    def __init__(self, guild_data: dict, members_data: List[dict]) -> None:
        self.id = guild_data.get('id')
        self.name = guild_data.get('name')
        self.description = guild_data.get('description')
        self.banner = guild_data.get('banner')
        self.icon = guild_data.get('icon')
        self.region = guild_data.get('region')

        self._set_roles(guild_data.get('roles'))
        self._set_members(members_data)

    def _set_roles(self, roles: List[Dict]) -> None:
        self.roles = {}
        for role_data in roles:
            role: Role = Role(role_data)
            if role.id == self.id:
                self.default_role = role
            else:
                self.roles[role.id] = role

    def _set_members(self, members: List[Dict]) -> None:
        self.members = {}
        for member_data in members:
            member: Member = Member(member_data)
            self.members[member.id] = member

    def __repr__(self) -> str:
        return json.dumps(json.loads(ObjectEncoder().encode(self)), indent=4, sort_keys=True)

    def __str__(self) -> str:
        return repr(self)
