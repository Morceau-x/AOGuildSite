from django.http import HttpRequest

from AOGSbackend.utils.http_tools import error_response


def authenticated(function):
    def wrapper(request: HttpRequest, *args, **kw):
        if not request.user.is_authenticated:
            return error_response("Precondition Failed", "User is not authenticated.", 412)
        else:
            return function(request, *args, **kw)

    return wrapper
