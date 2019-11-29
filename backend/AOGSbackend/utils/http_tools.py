import json

from django.http import HttpResponse, JsonResponse


def error_response(error_name: str, error_msg: str, error_code: int) -> HttpResponse:
    return JsonResponse({"error": error_name, "message": error_msg}, status=error_code)