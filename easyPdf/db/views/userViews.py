from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from ..bzl.userBzl import get_all_create_user


def getUsersCreateUser(request, *args, **kwargs):
    return get_all_create_user(request)
