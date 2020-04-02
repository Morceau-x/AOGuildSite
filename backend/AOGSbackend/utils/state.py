import string
from enum import Enum

from dataclasses import dataclass
from django.contrib.auth import get_user_model

User = get_user_model()


class StateTypes(Enum):
    NONE = 0
    AUTHORIZE = 1


@dataclass
class StateValue:
    redirect_uri: str
    state_type: StateTypes


class State:
    states = {}
    choices = string.ascii_letters + string.digits
    size = 64

    def add(self, value: StateValue):
        key = User.objects.make_random_password(length=64)
        self.states[key] = value
        return key

    def __getitem__(self, key) -> StateValue:
        return self.states[key]

    def __delitem__(self, key):
        del self.states[key]

    def __contains__(self, item) -> bool:
        return item in self.states
