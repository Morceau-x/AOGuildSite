from typing import Optional, List


class Member:
    id: str
    username: str
    discriminator: str
    avatar: Optional[str]
    nick: Optional[str]
    roles: List[str]

    def __init__(self, member_data: dict) -> None:
        self.id = member_data.get('user').get('id')
        self.username = member_data.get('user').get('username')
        self.discriminator = member_data.get('user').get('discriminator')
        self.avatar = member_data.get('user').get('avatar')
        self.nick = member_data.get('nick')
        self.roles = member_data.get('roles')
