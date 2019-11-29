class Role:
    id: str
    name: str
    mentionable: bool

    def __init__(self, role_data: dict) -> None:
        self.id = role_data.get('id')
        self.name = role_data.get('name')
        self.mentionable = role_data.get('mentionable')
