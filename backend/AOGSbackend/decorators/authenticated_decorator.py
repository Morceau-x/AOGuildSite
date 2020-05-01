import os

from django.http import HttpRequest

from AOGSbackend.utils.http_tools import error_response
from AccountManagement.models import UserModel


def authenticated(function):
    def wrapper(request: HttpRequest, *args, **kw):
        if not request.user.is_authenticated:
            if os.getenv('MODE') == 'development':
                request.user = UserModel.objects.get(user_id=int(os.getenv('DEV_USER')))
                return function(request, *args, **kw)
            else:
                return error_response("Precondition Failed", "User is not authenticated.", 412)
        else:
            return function(request, *args, **kw)

    return wrapper
