from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from ..bzl.userBzl import get_users


def getUsers(request, *args, **kwargs):
    return get_users(request)
